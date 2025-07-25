import useFinancialEntriesTotalAmount from 'api/queries/useFinancialEntriesTotalAmount';
import { Formatter } from 'utils/Formatter/Formatter';
import { View, Text } from 'react-native';
import { Loader } from 'components/atoms';
import colors from 'theme/colors';

const TotalFinancialEntriesAmount = () => {
  const { data: totalAmount, isFetching: isFetchingTotalAmount } =
    useFinancialEntriesTotalAmount();

  return (
    <View className='h-[400px] bg-primary-blue-400 justify-center items-center'>
      {isFetchingTotalAmount ? (
        <Loader color={colors.primary.white} />
      ) : (
        <Text
          className='text-h1 text-white'
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {Formatter.formatAmount(totalAmount ?? 0)} PLN
        </Text>
      )}
    </View>
  );
};

export default TotalFinancialEntriesAmount;
