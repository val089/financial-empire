import { View, Text, TouchableOpacity } from 'react-native';
import { AddFinancialEntryScreenProps } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';
import { ScreenHeader } from 'components/organisms';
import { FinancialEntryTypeList } from 'lib/types';
import { Ionicons } from '@expo/vector-icons';
import { Screens } from 'utils/Screens';
import CategoryIcon from 'components/atoms/CategoryIcon';

import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { useAddFinancialEntryContext } from 'contexts/AddFinancialEntryContext';

const AddFinancialEntryScreen = ({
  navigation,
}: AddFinancialEntryScreenProps) => {
  const { mutate: addFinancialEntry, isPending } = useAddFinancialEntry();
  const { showErrorToast, showSuccessToast } = useDefaultToast();
  const queryClient = useQueryClient();

  const {
    category_name,
    subcategory_name,
    amount,
    type,
    setAmount,
    setType,
    setCategoryName,
    setSubcategoryName,
  } = useAddFinancialEntryContext();

  const onSubmit = () => {
    const formattedAmount =
      type === FinancialEntryTypeList.expense && amount !== ''
        ? -Number(amount)
        : Number(amount);

    addFinancialEntry(
      {
        type,
        category_name,
        subcategory_name,
        amount: formattedAmount,
      },
      {
        onSuccess: () => {
          setAmount('0');
          setType(FinancialEntryTypeList.expense);
          setCategoryName(null);
          setSubcategoryName(null);

          queryClient.invalidateQueries({
            queryKey: [Queries.FinancialEntries],
          });
          queryClient.invalidateQueries({
            queryKey: [Queries.FinancialEntriesTotalAmount],
          });
          queryClient.invalidateQueries({
            queryKey: [Queries.MonthlyFinancialSummary],
          });

          showSuccessToast('Financial entry added successfully!');

          navigation?.goBack();
        },
        onError: () => showErrorToast(),
      }
    );
  };

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader
        onBackPress={() => navigation?.popTo(Screens.FinancialEntries)}
        title='Add financial entry'
      />

      <View className='px-4'>
        <View className='flex-row justify-between w-full mt-4 gap-4'>
          <CheckableButton
            label='Expense'
            onPress={() => setType(FinancialEntryTypeList.expense)}
            isSelected={type === FinancialEntryTypeList.expense}
          />
          <CheckableButton
            label='Income'
            onPress={() => setType(FinancialEntryTypeList.income)}
            isSelected={type === FinancialEntryTypeList.income}
          />
        </View>

        <View className='h-24 justify-center items-center'>
          <View className='flex-row items-center'>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate(Screens.CategoryFinancialEntries)
              }
              hitSlop={10}
            >
              {!category_name ? (
                <Text className='text-h3 font-interMedium'>
                  Select category
                </Text>
              ) : (
                <>
                  <View className='flex-row items-center'>
                    <CategoryIcon size={20} categoryName={category_name} />
                    <Text className='text-h3 font-interMedium ml-2'>
                      {`${category_name}${subcategory_name ? ` / ${subcategory_name}` : ''}`}
                    </Text>
                    <Ionicons name='chevron-forward' size={20} />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className='justify-center items-center h-36'>
          <Text
            className='items-center text-h1'
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {type === FinancialEntryTypeList.expense ? '-' : '+'}
            {amount}

            {/* TODO: set currency in the future */}
            {' PLN'}
          </Text>
        </View>

        <Button
          label='Add'
          onPress={onSubmit}
          disabled={isPending || amount === '0'}
        />
      </View>

      <NumberPad value={amount} onChange={setAmount} className='flex-1' />
    </View>
  );
};

export default AddFinancialEntryScreen;
