import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import useMonthlyFinancialSummary from 'api/queries/useMonthlyFinancialSummary';
import { formatYLabel, formatChartData, formatCurrency } from './utils';
import { BarChart, ruleTypes } from 'react-native-gifted-charts';
import { View } from 'react-native';
import { Loader } from 'components/atoms';
import {
  MonthlyFinancialSummaryChartProps,
  BarChartDataItem,
  TooltipData,
} from './types';
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

  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const chartData = useMemo(() => formatChartData(data), [data]);
  const chartWidth = Dimensions.get('window').width - 60;

  useEffect(
    () => () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    },
    []
  );

  const handleBarPress = useCallback(
    (item: BarChartDataItem, index: number) => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }

      const isIncome = index % 2 === 0;
      const type = isIncome ? 'Income' : 'Expenses';
      const formattedValue = formatCurrency(Math.abs(item.value));

      setTooltipData({
        value: formattedValue,
        type,
      });

      tooltipTimeoutRef.current = setTimeout(() => {
        setTooltipData(null);
      }, 3000);
    },
    []
  );

  if (isFetching) {
    return (
      <View className={className} testID='monthly-chart-container'>
        <Typography
          variant='h4Regular'
          className='px-4 mb-4 text-gray-500'
          testID={testIDs.monthlyChartTitle}
        >
          Monthly summary
        </Typography>
        <View className='h-[200px]'>
          <Loader />
        </View>
      </View>
    );
  }

  if (chartData?.length === 0) {
    return (
      <View className={className} testID='monthly-chart-container'>
        <Typography
          variant='h4Regular'
          className='px-4 mb-4 text-gray-500'
          testID={testIDs.monthlyChartTitle}
        >
          Monthly summary
        </Typography>
        <Typography
          variant='h4Regular'
          className='my-14 text-center text-gray-500'
          testID={testIDs.noMonthlySummaryChartDataAvailable}
        >
          No chart data available
        </Typography>
      </View>
    );
  }

  return (
    <View className={className} testID='monthly-chart-container'>
      <Typography
        variant='h4Regular'
        className='px-4 mb-4 text-gray-500'
        testID={testIDs.monthlyChartTitle}
      >
        Monthly summary
      </Typography>

      <View style={{ position: 'relative' }}>
        <BarChart
          showFractionalValues
          data={chartData}
          width={chartWidth}
          spacing={5}
          barBorderTopLeftRadius={6}
          barBorderTopRightRadius={6}
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
          topLabelTextStyle={{
            color: 'gray',
            fontSize: 10,
            fontWeight: 'bold',
          }}
          onPress={handleBarPress}
        />

        {tooltipData && (
          <View
            style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: [{ translateX: -50 }],
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6,
              zIndex: 1000,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {tooltipData.type}: {tooltipData.value}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MonthlyFinancialSummaryChart;
