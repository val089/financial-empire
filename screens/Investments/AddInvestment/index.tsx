import { ScreenHeader } from 'components/organisms';
import {
  AddInvestmentScreenProps,
  AddInvestmentFormData,
  AddInvestmentSchema,
} from './types';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button, Input, ScreenContentWrapper } from 'components/atoms';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { Formatter } from 'utils/Formatter/Formatter';

const currency = 'PLN';

const AddInvestmentScreen = ({ navigation }: AddInvestmentScreenProps) => {
  const formMethods = useForm<AddInvestmentFormData>({
    defaultValues: {
      name: '',
      purchase_date: format(new Date(), 'yyyy-MM-dd'),
      share_price: '',
      shares_amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(AddInvestmentSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: AddInvestmentFormData) => {
    //TODO: Handle form submission
    console.log(data);
  };

  return (
    <>
      <ScreenHeader
        title='Add Investment'
        onBackPress={() => navigation?.goBack()}
      />
      <FormProvider {...formMethods}>
        <ScreenContentWrapper className='mt-8' isScrollable>
          <Controller
            name='name'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Name:'
                className='mb-4'
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={error?.message}
              />
            )}
          />
          {/* TODO: Add date picker */}
          <Controller
            name='purchase_date'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Purchase date:'
                className='mb-4'
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            name='share_price'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Share price:'
                placeholder={`0 ${currency}`}
                className='mb-4'
                value={field.value.toString()}
                keyboardType='decimal-pad'
                onChangeText={(value) => {
                  const formattedValue = Formatter.formatDecimalInput(value);
                  field.onChange(formattedValue);
                }}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            name='shares_amount'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Shares amount:'
                className='mb-4'
                value={field.value.toString()}
                onChangeText={(value) => {
                  const formattedValue = Formatter.formatDecimalInput(value, 4);
                  field.onChange(formattedValue);
                }}
                errorMessage={error?.message}
              />
            )}
          />

          <Button
            label='Add Investment'
            className='mt-4'
            onPress={handleSubmit(onSubmit)}
          />
        </ScreenContentWrapper>
      </FormProvider>
    </>
  );
};

export default AddInvestmentScreen;
