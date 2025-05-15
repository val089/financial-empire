import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { FinancialEntriesScreenProps } from './types';
import { FloatingAddButton, Input } from 'components/atoms';
import useFinancialEntries from 'api/queries/useFinancialEntries';
import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import { Screens } from 'utils/Screens';

// TODO: move this to bottom navigator

const FinancialEntriesScreen = ({
  navigation,
}: FinancialEntriesScreenProps) => {
  const {
    data: financialEntries,
    isPending,
    isLoading,
    refetch,
  } = useFinancialEntries();

  const { mutate: addEntry } = useAddFinancialEntry();

  const handleAddEntry = () => {
    addEntry(
      {
        name: 'Test08',
        amount: 150,
        type: 'income',
      },
      { onSuccess: () => refetch() }
    );
  };

  return (
    <>
      <FloatingAddButton
        onPress={() => navigation?.navigate(Screens.AddEntry)}
      />
      <FlatList
        className='px-4'
        data={financialEntries}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <>
            <Input className='mt-4' keyboardType='numeric' />
            <Button title='Add Income' onPress={handleAddEntry} />
          </>
        }
        renderItem={({ item }) => (
          <View
            className='p-2 mb-2 rounded-md bg-blue-200 flex-row justify-between'
            key={item.id}
          >
            <Text className='text-h3'>{item.name}</Text>
            <Text className='text-h3'>{item.amount}</Text>
          </View>
        )}
        ListFooterComponent={
          isPending || isLoading ? <ActivityIndicator /> : null
        }
      />
    </>
  );
};

export default FinancialEntriesScreen;
