import { View, Text, ActivityIndicator } from 'react-native';
import { FinancialEntriesScreenProps } from './types';
import { FloatingAddButton } from 'components/atoms';
import useFinancialEntries from 'api/queries/useFinancialEntries';
import { Screens } from 'utils/Screens';
import { FlashList } from '@shopify/flash-list';

const FinancialEntriesScreen = ({
  navigation,
}: FinancialEntriesScreenProps) => {
  const { data: financialEntries, isFetching } = useFinancialEntries();

  return (
    <>
      <FloatingAddButton
        onPress={() => navigation?.navigate(Screens.AddFinancialEntry)}
      />
      <FlashList
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        data={financialEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            className='p-2 mb-2 rounded-md bg-blue-200 flex-row justify-between'
            key={item.id}
          >
            <Text className='text-h3'>{item.name}</Text>
            <Text className='text-h3'>{item.amount}</Text>
          </View>
        )}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          !isFetching ? (
            <Text className='text-center text-gray-500'>No entries found</Text>
          ) : null
        }
      />
    </>
  );
};

export default FinancialEntriesScreen;
