import { MonthlyFinancialSummary } from 'lib/types';
import {
  monthLabels,
  incomeSpacing,
  barWidth,
  frontColorIncome,
  frontColorExpense,
  expenseSpacing,
} from './consts';
import { barDataItem } from 'react-native-gifted-charts';

export const formatYLabel = (value: string): string => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;

  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? '-' : '';

  if (absValue >= 1000000) {
    return `${sign}${(absValue / 1000000).toFixed(1)}M`;
  }
  if (absValue >= 1000) {
    return `${sign}${Math.round(absValue / 1000)}k`;
  }
  return numValue.toString();
};

export const formatChartData = (
  data: MonthlyFinancialSummary[] | null | undefined
): barDataItem[] => {
  if (!data) return [];

  return data?.flatMap((item) => {
    const label = monthLabels[item.month - 1];

    return [
      {
        value: item.income || 0,
        frontColor: frontColorIncome,
        spacing: incomeSpacing,
        label, // label only for income
        barWidth,
      },
      {
        value: -item.expense || 0, // expense is negative and we want to show above the x-axis
        frontColor: frontColorExpense,
        barWidth,
        spacing: expenseSpacing,
      },
    ];
  });
};
