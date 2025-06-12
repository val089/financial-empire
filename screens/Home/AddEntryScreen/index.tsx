import { View, Text } from 'react-native';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { FormData } from './types';
import { CheckableButton } from 'components/atoms';
import { NumberPad } from 'components/molecules';
import { Button } from 'components/atoms';

const AddEntryScreen = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      type: 'income',
      amount: 0,
    },
    // resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { handleSubmit, setValue, watch } = methods;

  const onSubmit = (formData: FormData) => {
    console.log('formData', formData);
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

          <Button label='Add' onPress={handleSubmit(onSubmit)} />
        </View>

        <NumberPad
          onChange={(result) => setValue('amount', Number(result))}
          className='flex-1'
        />
      </FormProvider>
    </View>
  );
};

export default AddEntryScreen;
