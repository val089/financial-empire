import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import useMonthlyFinancialSummary from 'api/queries/useMonthlyFinancialSummary';
import { formatYLabel, formatChartData } from './utils';
import { BarChart, ruleTypes } from 'react-native-gifted-charts';
import { View } from 'react-native';
import { Loader } from 'components/atoms';
import { MonthlyFinancialSummaryChartProps } from './types';
import Typography from 'components/atoms/Typography';
import { testIDs } from 'utils/testIDs';

// TODO: adjust chart to tablets
const MonthlyFinancialSummaryChart = ({
  className,
}: MonthlyFinancialSummaryChartProps) => {
  // TODO: add legend for chart and year select
  const { data, isFetching } = useMonthlyFinancialSummary({
    filter_year: 2025,
  });

  const chartData = useMemo(() => formatChartData(data), [data]);

  const renderChart = () => {
    if (isFetching)
      return (
        <View className='h-[200px]'>
          <Loader />
        </View>
      );

    if (chartData?.length === 0) {
      return (
        <Typography
          variant='h4Regular'
          className='my-14 text-center text-gray-500'
          testID={testIDs.noMonthlySummaryChartDataAvailable}
        >
          No chart data available
        </Typography>
      );
    }

    return (
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 60}
        spacing={5}
        barBorderRadius={2}
        yAxisThickness={0}
        xAxisType={ruleTypes.DASHED}
        xAxisColor={'lightgray'}
        yAxisTextStyle={{ color: 'gray', fontSize: 10 }}
        noOfSections={6}
        labelWidth={20}
        xAxisLabelTextStyle={{
          color: 'gray',
          textAlign: 'center',
          fontSize: 10,
        }}
        formatYLabel={formatYLabel}
      />
    );
  };

  return (
    <View className={className} testID='monthly-chart-container'>
      <Typography
        variant='h4Regular'
        className='px-4 mb-4 text-gray-500'
        testID={testIDs.monthlyChartTitle}
      >
        Monthly summary
      </Typography>

      <View>{renderChart()}</View>
    </View>
  );
};

export default MonthlyFinancialSummaryChart;
