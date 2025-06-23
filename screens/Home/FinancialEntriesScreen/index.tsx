import { View, Text, ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import { FinancialEntriesScreenProps } from './types';
import { FloatingAddButton } from 'components/atoms';
import useFinancialEntries from 'api/queries/useFinancialEntries';
import { Screens } from 'utils/Screens';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FinancialEntry } from 'lib/types';
import { Formatter } from 'utils/Formatter/Formatter';

const FinancialEntriesScreen = ({
  navigation,
}: FinancialEntriesScreenProps) => {
  const { data: financialEntries, isFetching } = useFinancialEntries();

  const renderItem: ListRenderItem<FinancialEntry> = useCallback(
    ({ item, index }) => {
      const currentDateString = Formatter.getDateString(item.created_at);
      const previousDateString =
        index > 0 && financialEntries?.[index - 1]?.created_at
          ? Formatter.getDateString(financialEntries[index - 1].created_at)
          : null;
      const shouldShowDate = currentDateString !== previousDateString;

      return (
        <>
          {shouldShowDate && (
            <Text className='text-h2 px-4 mt-10 font-interMedium'>
              {Formatter.formatDate(item.created_at)}
            </Text>
          )}
          <View
            className='p-4 flex-row justify-between items-center border-b border-b-gray-200'
            key={item.id}
          >
            <View>
              <Text className='text-h3'>{item.category || 'TEST'}</Text>
              <Text className='text-h4 text-gray-400'>
                {Formatter.timeFromDate(item.created_at)}
              </Text>
            </View>

            {item.type === 'income' ? (
              <Text className='text-h3 text-green-500'>+ {item.amount}</Text>
            ) : (
              <Text className='text-h3 text-red-500'>- {item.amount}</Text>
            )}
          </View>
        </>
      );
    },
    [financialEntries]
  );

  return (
    <View className='flex-1 bg-white'>
      <FloatingAddButton
        onPress={() => navigation?.navigate(Screens.AddFinancialEntry)}
      />
      <FlashList
        estimatedItemSize={100}
        data={financialEntries}
        keyExtractor={(item) => String(item.id)}
        {...{ renderItem }}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          !isFetching ? (
            <Text className='text-center text-gray-500'>No entries found</Text>
          ) : null
        }
      />
    </View>
  );
};

export default FinancialEntriesScreen;
