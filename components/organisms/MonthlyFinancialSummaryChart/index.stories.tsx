import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import MonthlyFinancialSummaryChart from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});

const meta = {
  title: 'Organisms/MonthlyFinancialSummaryChart',
  component: MonthlyFinancialSummaryChart,
  argTypes: {},
  args: {},
  decorators: [
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof MonthlyFinancialSummaryChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
