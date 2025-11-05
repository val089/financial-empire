import { View, TouchableOpacity } from 'react-native';
import { AddFinancialEntryScreenProps } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';
import { ScreenHeader } from 'components/organisms';
import { FinancialEntryTypeList } from 'lib/supabase/types';
import { Ionicons } from '@expo/vector-icons';
import { Screens } from 'utils/Screens';
import CategoryIcon from 'components/atoms/CategoryIcon';

import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { useAddFinancialEntryContext } from 'contexts/AddFinancialEntryContext';
import useEditFinancialEntry from 'api/mutations/useEditFinancialEntry';
import Typography from 'components/atoms/Typography';
import InputButton from 'components/atoms/InputButton';
import { format } from 'date-fns';
import useModal from 'hooks/useModal';
import DateTimePickerModal from 'components/atoms/DateTimePickerModal';
import { InputButtonHandle } from 'components/atoms/InputButton/types';
import { useRef } from 'react';

const AddFinancialEntryScreen = ({
  navigation,
}: AddFinancialEntryScreenProps) => {
  const { mutate: addFinancialEntry, isPending } = useAddFinancialEntry();
  const { mutate: editFinancialEntry } = useEditFinancialEntry();
  const { showErrorToast, showSuccessToast } = useDefaultToast();
  const queryClient = useQueryClient();

  const {
    visible: isDateTimePickerVisible,
    closeModal: closeDateTimePicker,
    openModal,
  } = useModal();

  const inputButtonRef = useRef<InputButtonHandle>(null);

  const {
    financialEntry: {
      id,
      amount,
      category_name,
      subcategory_name,
      type,
      entry_date,
      created_at,
    },
    setFinancialEntry,
    setDefaultValues,
    isEditting,
  } = useAddFinancialEntryContext();

  const onSubmit = () => {
    const numericAmount = Number(amount);

    if (!category_name) {
      showErrorToast('Please select a category', 'Category is required');
      return;
    }

    if (isEditting) {
      editFinancialEntry(
        {
          id,
          type,
          category_name,
          subcategory_name,
          amount: numericAmount,
          entry_date: entry_date ? new Date(entry_date).toISOString() : null,
        },
        {
          onSuccess: () => {
            setDefaultValues(null);

            queryClient.invalidateQueries({
              queryKey: [Queries.FinancialEntries],
            });

            queryClient.invalidateQueries({
              queryKey: [Queries.FinancialEntriesTotalAmount],
            });

            navigation?.popTo(Screens.FinancialEntries);
          },
          onError: () => showErrorToast(),
        }
      );

      return;
    }

    addFinancialEntry(
      {
        type,
        category_name,
        subcategory_name,
        amount: numericAmount,
        entry_date: entry_date?.toISOString() || null,
      },
      {
        onSuccess: () => {
          setDefaultValues(null);

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

          navigation?.popTo(Screens.FinancialEntries);
        },
        onError: () => showErrorToast(),
      }
    );
  };

  return (
    <>
      <View className='flex-1 bg-white'>
        <ScreenHeader
          onBackPress={() => navigation?.popTo(Screens.FinancialEntries)}
          title='Add financial entry'
        />

        <View className='px-4'>
          <View className='flex-row justify-between w-full mt-4 gap-4 mb-4'>
            <CheckableButton
              label='Expense'
              onPress={() => {
                inputButtonRef.current?.blur();
                setFinancialEntry((prevState) => ({
                  ...prevState,
                  type: FinancialEntryTypeList.expense,
                }));
              }}
              isSelected={type === FinancialEntryTypeList.expense}
            />
            <CheckableButton
              label='Income'
              onPress={() => {
                inputButtonRef.current?.blur();
                setFinancialEntry((prevState) => ({
                  ...prevState,
                  type: FinancialEntryTypeList.income,
                }));
              }}
              isSelected={type === FinancialEntryTypeList.income}
            />
          </View>

          <InputButton
            label='Date'
            value={
              entry_date
                ? format(entry_date, 'yyyy-MM-dd')
                : format(created_at, 'yyyy-MM-dd')
            }
            onPress={openModal}
            ref={inputButtonRef}
          />

          <View className='h-24 justify-center items-center'>
            <View className='flex-row items-center'>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate(Screens.CategoryFinancialEntries)
                }
                hitSlop={10}
              >
                {!category_name ? (
                  <Typography variant='h3'>Please select a category</Typography>
                ) : (
                  <>
                    <View className='flex-row items-center'>
                      <CategoryIcon size={20} categoryName={category_name} />

                      <Typography variant='h3' className='ml-2'>
                        {`${category_name}${subcategory_name ? ` / ${subcategory_name}` : ''}`}
                      </Typography>

                      <Ionicons name='chevron-forward' size={20} />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className='justify-center items-center h-36'>
            <Typography
              variant='h1Regular'
              className='items-center'
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {type === FinancialEntryTypeList.expense ? '-' : '+'}
              {amount}
              {/* TODO: set currency in the future */}
              {' PLN'}
            </Typography>
          </View>

          <Button
            label={isEditting ? 'Save changes' : 'Add'}
            onPress={onSubmit}
            disabled={isPending || amount === '0'}
          />
        </View>

        <NumberPad
          value={amount}
          onChange={(value) => {
            setFinancialEntry((prevState) => ({
              ...prevState,
              amount: value,
            }));
          }}
          className='flex-1'
        />
      </View>

      <DateTimePickerModal
        visible={isDateTimePickerVisible}
        onChange={(date) => {
          setFinancialEntry((prevState) => ({
            ...prevState,
            entry_date: date,
          }));
        }}
        onClose={closeDateTimePicker}
        value={entry_date || created_at}
      />
    </>
  );
};

export default AddFinancialEntryScreen;
