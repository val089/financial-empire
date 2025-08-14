import { useMemo } from 'react';
import { Dimensions, Text } from 'react-native';
import useMonthlyFinancialSummary from 'api/queries/useMonthlyFinancialSummary';
import { formatYLabel, formatChartData } from './utils';
import { BarChart, ruleTypes } from 'react-native-gifted-charts';
import { View } from 'react-native';
import { Loader } from 'components/atoms';
import { MonthlyFinancialSummaryChartProps } from './types';

// TODO: adjust chart to tablets
const MonthlyFinancialSummaryChart = ({
  className,
}: MonthlyFinancialSummaryChartProps) => {
  const { data, isFetching } = useMonthlyFinancialSummary();

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
        <Text className='mt-4 text-center text-gray-500' testID='no-data'>
          No data available
        </Text>
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
      <Text
        className='text-h4 px-4 mb-4 text-gray-500 font-interRegular'
        testID='monthly-summary-title'
      >
        Monthly summary
      </Text>
      <View>{renderChart()}</View>
    </View>
  );
};

export default MonthlyFinancialSummaryChart;
