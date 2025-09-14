import { View, Text } from 'react-native';
import { useCallback } from 'react';
import { FinancialEntriesScreenProps } from './types';
import { FloatingAddButton, Loader } from 'components/atoms';
import useFinancialEntries from 'api/queries/useFinancialEntries';
import { Screens } from 'utils/Screens';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FinancialEntry } from 'lib/types';
import { Formatter } from 'utils/Formatter/Formatter';
import FinancialEntryItem from './components/FinancialEntryItem';
import useRefreshOnScroll from 'hooks/useRefreshOnScroll';
import { ScreenHeader } from 'components/organisms';
import useDeleteFinancialEntry from 'api/mutations/useDeleteFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { useAddFinancialEntryContext } from 'contexts/AddFinancialEntryContext';

const FinancialEntriesScreen = ({
  navigation,
}: FinancialEntriesScreenProps) => {
  const { setDefaultValues, setIsEditting } = useAddFinancialEntryContext();

  const {
    data: financialEntries,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFinancialEntries({
    select: (queryData) => queryData.pages.flatMap((data) => data),
  });

  const queryClient = useQueryClient();

  const { mutate: deleteFinancialEntry } = useDeleteFinancialEntry();

  const { showErrorToast } = useDefaultToast();

  const { refreshControl } = useRefreshOnScroll({ refetch });

  const renderItem: ListRenderItem<FinancialEntry> = useCallback(
    ({ item, index }) => {
      const currentDateString = Formatter.getDateString(item.created_at);
      const previousDateString =
        index > 0 && financialEntries?.[index - 1]?.created_at
          ? Formatter.getDateString(financialEntries[index - 1].created_at)
          : null;
      const showMainDate = currentDateString !== previousDateString;

      return (
        <FinancialEntryItem
          {...{ item, showMainDate }}
          onDelete={() => {
            deleteFinancialEntry(item.id, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: [Queries.FinancialEntriesTotalAmount],
                });
                queryClient.invalidateQueries({
                  queryKey: [Queries.MonthlyFinancialSummary],
                });
              },
              onError: () => showErrorToast(),
            });
          }}
          onPress={() => {
            setIsEditting(true);
            setDefaultValues({
              category_name: item.category_name,
              subcategory_name: item.subcategory_name,
              type: item.type,
              amount: String(Math.abs(item.amount)), // Convert to positive for UI, type will determine sign
            });
            navigation?.navigate(Screens.AddFinancialEntry, {
              financialEntryId: item.id,
            });
          }}
        />
      );
    },
    [
      financialEntries,
      deleteFinancialEntry,
      queryClient,
      showErrorToast,
      setDefaultValues,
      navigation,
      setIsEditting,
    ]
  );

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader title='Financial entries' />
      <FloatingAddButton
        onPress={() => {
          setIsEditting(false);
          setDefaultValues(null);
          navigation?.navigate(Screens.AddFinancialEntry, {});
        }}
      />
      <FlashList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        estimatedItemSize={100}
        data={financialEntries}
        keyExtractor={(item) => String(item.id)}
        {...{ renderItem, refreshControl }}
        ListEmptyComponent={
          !isFetching && financialEntries?.length === 0 ? (
            <Text className='text-h3 text-center text-gray-500 mt-20'>
              No entries found
            </Text>
          ) : null
        }
        onEndReached={() => (hasNextPage ? fetchNextPage() : undefined)}
        ListFooterComponent={
          hasNextPage || isLoading ? <Loader className='mt-20' /> : null
        }
      />
    </View>
  );
};

export default FinancialEntriesScreen;
