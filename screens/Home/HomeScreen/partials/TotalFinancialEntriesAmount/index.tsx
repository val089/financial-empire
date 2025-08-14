import useFinancialEntriesTotalAmount from 'api/queries/useFinancialEntriesTotalAmount';
import { Formatter } from 'utils/Formatter/Formatter';
import { View, Text } from 'react-native';
import { Loader } from 'components/atoms';
import colors from 'theme/colors';

const TotalFinancialEntriesAmount = () => {
  const { data: totalAmount, isFetching: isFetchingTotalAmount } =
    useFinancialEntriesTotalAmount();

  return (
    <View className='bg-white rounded-md my-4 px-4'>
      {isFetchingTotalAmount ? (
        <Loader color={colors.primary.white} />
      ) : (
        <View>
          <Text className='text-h4 mb-2 text-gray-500 font-interRegular'>
            Total balance
          </Text>
          <Text
            className='text-h3 font-interMedium'
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {Formatter.formatAmount(totalAmount ?? 0)} PLN
          </Text>
        </View>
      )}
    </View>
  );
};

export default TotalFinancialEntriesAmount;
