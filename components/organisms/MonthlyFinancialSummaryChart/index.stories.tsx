import type { Meta, StoryObj } from '@storybook/react';
import MonthlyFinancialSummaryChart from '.';

const meta = {
  title: 'Organisms/MonthlyFinancialSummaryChart',
  component: MonthlyFinancialSummaryChart,
  argTypes: {},
  args: {},
} satisfies Meta<typeof MonthlyFinancialSummaryChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
