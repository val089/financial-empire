import { View, Text, ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import { FinancialEntriesScreenProps } from './types';
import { FloatingAddButton } from 'components/atoms';
import useFinancialEntries from 'api/queries/useFinancialEntries';
import { Screens } from 'utils/Screens';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FinancialEntry } from 'lib/types';
import { Formatter } from 'utils/Formatter/Formatter';
import FinancialEntryItem from './components/FinancialEntryItem';

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
      const showMainDate = currentDateString !== previousDateString;

      return <FinancialEntryItem {...{ item, showMainDate }} />;
    },
    [financialEntries]
  );

  if (isFetching) {
    return (
      <View className='flex-1 bg-white justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <FloatingAddButton
        onPress={() => navigation?.navigate(Screens.AddFinancialEntry)}
      />
      <FlashList
        contentContainerStyle={{ paddingBottom: 100 }}
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
