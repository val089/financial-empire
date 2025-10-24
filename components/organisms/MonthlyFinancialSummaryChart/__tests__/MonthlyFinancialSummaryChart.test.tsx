import React from 'react';
import { render, screen } from 'setup/testing-library';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import MonthlyFinancialSummaryChart from '..';
import useMonthlyFinancialSummary from 'api/queries/useMonthlyFinancialSummary';
import { MonthlyFinancialSummary } from 'lib/supabase/types';

// Mock the hook
jest.mock('api/queries/useMonthlyFinancialSummary');
const mockUseMonthlyFinancialSummary =
  useMonthlyFinancialSummary as jest.MockedFunction<
    typeof useMonthlyFinancialSummary
  >;

// Mock react-native-gifted-charts
jest.mock('react-native-gifted-charts', () => ({
  BarChart: jest.fn(() => null),
  ruleTypes: {
    DASHED: 'dashed',
  },
}));

const mockBarChart = BarChart as jest.MockedFunction<typeof BarChart>;

const mockData: MonthlyFinancialSummary[] = [
  { id: '1', year: 2024, month: 1, income: 5000, expense: -3000 },
  { id: '2', year: 2024, month: 2, income: 4500, expense: -2800 },
  { id: '3', year: 2024, month: 3, income: 6000, expense: -3500 },
];

describe('MonthlyFinancialSummaryChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementation to return a simple element with testID
    mockBarChart.mockImplementation(() =>
      React.createElement(View, { testID: 'bar-chart' }, 'Mocked BarChart')
    );
  });

  it('renders loading state when data is being fetched', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: null,
      isFetching: true,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(screen.getByText('Monthly summary')).toBeTruthy();
    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  it('renders "No data available" when there is no data', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: [],
      isFetching: false,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(screen.getByTestId('monthly-summary-title')).toBeTruthy();
    expect(screen.getByTestId('no-data')).toBeTruthy();
  });

  it('renders chart when data is available', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: mockData,
      isFetching: false,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(screen.getByText('Monthly summary')).toBeTruthy();
    expect(mockBarChart).toHaveBeenCalled();
  });

  it('transforms data correctly for chart', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: [mockData[0]],
      isFetching: false,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(mockBarChart).toHaveBeenCalled();

    const callArgs = mockBarChart.mock.calls[0][0];
    expect(callArgs.data).toBeDefined();
    expect(callArgs.data).toHaveLength(2);
    expect(callArgs.data![0]).toMatchObject({
      value: mockData[0].income,
      label: 'Jan',
      frontColor: '#006DFF',
    });
    expect(callArgs.data![1]).toMatchObject({
      value: -mockData[0].expense,
      frontColor: '#3BE9DE',
    });
  });

  it('handles null income and expense values', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: [{ id: '1', year: 2024, month: 1, income: null, expense: null }],
      isFetching: false,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(mockBarChart).toHaveBeenCalled();

    const callArgs = mockBarChart.mock.calls[0][0];
    expect(callArgs.data).toBeDefined();
    expect(callArgs.data).toHaveLength(2);
    expect(callArgs.data![0].value).toBe(0); // null income should become 0
    expect(callArgs.data![1].value).toBe(0); // null expense should become 0
  });

  it('handles multiple months correctly', () => {
    mockUseMonthlyFinancialSummary.mockReturnValue({
      data: mockData,
      isFetching: false,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<MonthlyFinancialSummaryChart />);

    expect(mockBarChart).toHaveBeenCalled();

    const callArgs = mockBarChart.mock.calls[0][0];
    expect(callArgs.data).toBeDefined();
    expect(callArgs.data).toHaveLength(6); // 3 months * 2 bars each

    // Check January
    expect(callArgs.data![0]).toMatchObject({
      label: 'Jan',
      value: 5000,
      frontColor: '#006DFF',
    });
    expect(callArgs.data![1]).toMatchObject({
      value: 3000,
      frontColor: '#3BE9DE',
    });

    // Check February
    expect(callArgs.data![2]).toMatchObject({
      label: 'Feb',
      value: 4500,
      frontColor: '#006DFF',
    });
    expect(callArgs.data![3]).toMatchObject({
      value: 2800,
      frontColor: '#3BE9DE',
    });

    // Check March
    expect(callArgs.data![4]).toMatchObject({
      label: 'Mar',
      value: 6000,
      frontColor: '#006DFF',
    });
    expect(callArgs.data![5]).toMatchObject({
      value: 3500,
      frontColor: '#3BE9DE',
    });
  });
});
