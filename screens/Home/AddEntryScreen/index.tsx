import { View, Text } from 'react-native';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { AddFinancialEntryScreenProps, FormData } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';
import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';

const AddFinancialEntryScreen = ({
  navigation,
}: AddFinancialEntryScreenProps) => {
  const { mutate: addFinancialEntry } = useAddFinancialEntry();
  const { showDefaultToastOnError, showSuccessToast } = useDefaultToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    defaultValues: {
      type: 'income',
      amount: '0',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formData: FormData) => {
    addFinancialEntry(
      {
        ...formData,
        amount: parseFloat(formData.amount),
      },
      {
        // TODO: Add optimistic update
        onSuccess: () => {
          showSuccessToast('Financial entry added successfully!');

          queryClient.invalidateQueries({
            queryKey: [Queries.FinancialEntries],
          });

          navigation?.goBack();
        },
        onError: () => showDefaultToastOnError(),
      }
    );
  };

  return (
    <View className='flex-1 bg-white'>
      <FormProvider {...methods}>
        <View className='px-4'>
          <View className='items-centser'>
            <Controller
              name='type'
              render={({ field: { onChange, value } }) => (
                <View className='flex-row justify-between w-full mt-4 gap-4'>
                  <CheckableButton
                    label='Expense'
                    onPress={() => onChange('expense')}
                    isSelected={value === 'expense'}
                  />
                  <CheckableButton
                    label='Income'
                    onPress={() => onChange('income')}
                    isSelected={value === 'income'}
                  />
                </View>
              )}
            />
          </View>

          <View className='justify-center items-center h-60'>
            <Text
              className='items-center text-h1'
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {watch('type') === 'expense' ? '-' : '+'}
              {watch('amount') || '0 PLN'}
            </Text>
          </View>

          <Button
            label='Add'
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </View>

        <NumberPad
          onChange={(result) => setValue('amount', result)}
          className='flex-1'
        />
      </FormProvider>
    </View>
  );
};

export default AddFinancialEntryScreen;
