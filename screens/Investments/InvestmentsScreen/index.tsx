import { Text, View } from 'react-native';
import { ScreenHeader } from 'components/organisms';
import { InvestmentsScreenProps } from './types';
import { FloatingAddButton, Loader } from 'components/atoms';
import { Screens } from 'utils/Screens';
import useInvestmentsQuery from 'api/queries/useInvestmentsQuery';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useCallback } from 'react';
import { InvestmentItem } from 'lib/supabase/types';
import { Formatter } from 'utils/Formatter/Formatter';
import FinancialEntryItem from 'components/molecules/FinancialEntryItem';
import useRefreshOnScroll from 'hooks/useRefreshOnScroll';

const InvestmentsScreen = ({ navigation }: InvestmentsScreenProps) => {
  const {
    data: investments,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInvestmentsQuery({
    select: (queryData) => queryData.pages.flatMap((data) => data),
  });

  const { refreshControl } = useRefreshOnScroll({ refetch });

  const renderItem: ListRenderItem<InvestmentItem> = useCallback(
    ({ item, index }) => {
      const currentDateString = Formatter.getDateString(item.created_at);
      const previousDateString =
        index > 0 && investments?.[index - 1]?.created_at
          ? Formatter.getDateString(investments[index - 1].created_at)
          : null;
      const showMainDate = currentDateString !== previousDateString;

      return (
        <FinancialEntryItem
          id={item.id}
          title={item.name}
          sectionTitle={showMainDate ? currentDateString : undefined}
          description={`Shares: ${item.shares_amount} @ ${item.share_price}`}
          rightText={`${item.shares_amount * item.share_price} ${item.currency || 'PLN'}`}
          onDelete={() => {}}
          onPress={() => {}}
        />
      );
    },
    [investments]
  );

  return (
    <>
      <ScreenHeader title='Investments' />
      <View className='flex-1'>
        <FloatingAddButton
          onPress={() => {
            navigation?.navigate(Screens.AddInvestment);
          }}
        />

        <FlashList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          estimatedItemSize={100}
          data={investments}
          keyExtractor={(item) => String(item.id)}
          {...{ renderItem, refreshControl }}
          ListEmptyComponent={
            !isFetching && investments?.length === 0 ? (
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
    </>
  );
};

export default InvestmentsScreen;
