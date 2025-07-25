import { View, Text } from 'react-native';
import { FormProvider, Controller } from 'react-hook-form';
import { AddFinancialEntryScreenProps } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';
import { ScreenHeader } from 'components/organisms';
import { useAddEntryScreen } from './hooks';
import { FinancialEntryTypeList } from 'lib/types';

const AddFinancialEntryScreen = ({
  navigation,
}: AddFinancialEntryScreenProps) => {
  const { onSubmit, formMethods, handleNumberPadOnChange } = useAddEntryScreen({
    navigation,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = formMethods;

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader
        onBackPress={() => navigation?.goBack()}
        title='Add financial entry'
      />
      <FormProvider {...formMethods}>
        <View className='px-4'>
          <View className='items-center'>
            <Controller
              name='type'
              render={({ field: { onChange, value } }) => (
                <View className='flex-row justify-between w-full mt-4 gap-4'>
                  <CheckableButton
                    label='Expense'
                    onPress={() => onChange(FinancialEntryTypeList.expense)}
                    isSelected={value === FinancialEntryTypeList.expense}
                  />
                  <CheckableButton
                    label='Income'
                    onPress={() => onChange(FinancialEntryTypeList.income)}
                    isSelected={value === FinancialEntryTypeList.income}
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
              {watch('amount') || '0 PLN'}
            </Text>
          </View>

          <Button
            label='Add'
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </View>

        <NumberPad onChange={handleNumberPadOnChange} className='flex-1' />
      </FormProvider>
    </View>
  );
};

export default AddFinancialEntryScreen;
