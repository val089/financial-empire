import { MonthlyFinancialSummary } from 'lib/types';
import { formatChartData } from '../utils';
import {
  barWidth,
  expenseSpacing,
  frontColorExpense,
  frontColorIncome,
  incomeSpacing,
} from '../consts';
import { barDataItem } from 'react-native-gifted-charts';

describe('formatChartData', () => {
  it('should format chart data correctly', () => {
    const input: MonthlyFinancialSummary[] = [
      {
        id: '1a',
        income: 3000,
        expense: -1500,
        month: 1,
        year: 2025,
      },
      {
        id: '2b',
        income: 1500,
        expense: -500,
        month: 2,
        year: 2025,
      },
    ];

    const expectedOutput: barDataItem[] = [
      {
        value: 3000,
        frontColor: frontColorIncome,
        spacing: incomeSpacing,
        label: 'Jan',
        barWidth,
      },
      {
        value: 1500,
        frontColor: frontColorExpense,
        spacing: expenseSpacing,
        barWidth,
      },
      {
        value: 1500,
        label: 'Feb',
        frontColor: frontColorIncome,
        barWidth,
        spacing: incomeSpacing,
      },
      {
        value: 500,
        frontColor: frontColorExpense,
        barWidth,
        spacing: expenseSpacing,
      },
    ];
    expect(formatChartData(input)).toEqual(expectedOutput);
  });
});
