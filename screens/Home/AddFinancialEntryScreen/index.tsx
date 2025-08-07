import { View, Text, TouchableOpacity } from 'react-native';
import { FormProvider, Controller } from 'react-hook-form';
import { AddFinancialEntryScreenProps } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';
import { ScreenHeader } from 'components/organisms';
import { useAddFinancialEntryScreen } from './hooks';
import { FinancialEntryTypeList } from 'lib/types';
import { Ionicons } from '@expo/vector-icons';
import { Screens } from 'utils/Screens';
import CategoryIcon from 'components/atoms/CategoryIcon';

const AddFinancialEntryScreen = ({
  navigation,
  route,
}: AddFinancialEntryScreenProps) => {
  const { onSubmit, formMethods, handleNumberPadOnChange } =
    useAddFinancialEntryScreen({
      navigation,
      route,
    });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = formMethods;

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader
        onBackPress={() => navigation?.goBack()}
        title='Add financial entry'
      />
      <FormProvider {...formMethods}>
        <View className='px-4'>
          <Controller
            name='type'
            render={({ field: { onChange, value } }) => (
              <View className='flex-row justify-between w-full mt-4 gap-4'>
                <CheckableButton
                  label='Expense'
                  onPress={() => {
                    onChange(FinancialEntryTypeList.expense);
                    setValue('amount', (getValues('amount') || 0) * -1);
                  }}
                  isSelected={value === FinancialEntryTypeList.expense}
                />
                <CheckableButton
                  label='Income'
                  onPress={() => {
                    onChange(FinancialEntryTypeList.income);
                    setValue('amount', (getValues('amount') || 0) * -1);
                  }}
                  isSelected={value === FinancialEntryTypeList.income}
                />
              </View>
            )}
          />

          <View className='h-24 justify-center items-center'>
            <View className='flex-row items-center'>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate(Screens.CategoryFinancialEntries)
                }
                hitSlop={10}
              >
                {!watch('category_name') ? (
                  <Text className='text-h3 font-interMedium'>
                    Select category
                  </Text>
                ) : (
                  <>
                    <View className='flex-row items-center'>
                      <CategoryIcon
                        size={20}
                        categoryName={watch('category_name')}
                      />
                      <Text className='text-h3 font-interMedium ml-2'>
                        {`${watch('category_name')}${watch('subcategory_name') ? ` / ${watch('subcategory_name')}` : ''}`}
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
