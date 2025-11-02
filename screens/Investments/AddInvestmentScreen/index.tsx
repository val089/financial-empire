import { ScreenHeader } from 'components/organisms';
import {
  AddInvestmentScreenProps,
  AddInvestmentFormData,
  AddInvestmentSchema,
} from './types';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import {
  Button,
  CheckableButton,
  Input,
  ScreenContentWrapper,
} from 'components/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Formatter } from 'utils/Formatter/Formatter';
import useAddInvestmentMutation from 'api/mutations/useAddInvestmentMutation';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import InputButton from 'components/atoms/InputButton';
import { format } from 'date-fns';
import { useRef } from 'react';
import { InputButtonHandle } from 'components/atoms/InputButton/types';
import MainModal from 'components/molecules/Modal/templates/MainModal';
import { IS_ANDROID, IS_IOS } from 'consts/environment';
import useModal from 'hooks/useModal';

const AddInvestmentScreen = ({ navigation }: AddInvestmentScreenProps) => {
  const { visible, closeModal, openModal } = useModal();

  const inputButtonRef = useRef<InputButtonHandle>(null);

  const { mutate: addInvestment, isPending } = useAddInvestmentMutation();

  const { showSuccessToast, showErrorToast } = useDefaultToast();

  const queryClient = useQueryClient();

  const formMethods = useForm<AddInvestmentFormData>({
    defaultValues: {
      name: '',
      purchase_date: new Date(),
      share_price: '',
      shares_amount: '',
      currency: 'PLN',
    },
    mode: 'onChange',
    resolver: zodResolver(AddInvestmentSchema),
  });

  const { handleSubmit, setValue, watch } = formMethods;

  const onSubmit = (data: AddInvestmentFormData) => {
    addInvestment(
      {
        name: data.name,
        purchase_date: data.purchase_date.toISOString(),
        share_price: parseFloat(data.share_price),
        shares_amount: parseFloat(data.shares_amount),
        currency: data.currency,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [Queries.Investments],
          });

          showSuccessToast('Investment added successfully');

          navigation?.goBack();
        },
        onError: (error) => {
          showErrorToast('Failed to add investment');
        },
      }
    );
  };

  return (
    <>
      <ScreenHeader
        title='Add Investment'
        onBackPress={() => navigation?.goBack()}
      />
      <FormProvider {...formMethods}>
        <ScreenContentWrapper className='mt-8' isScrollable>
          {/* TODO: add select screen with list of currency, country flags and search bar */}
          <View className='flex-row justify-between w-full mb-4 gap-4'>
            <CheckableButton
              label='PLN'
              onPress={() => setValue('currency', 'PLN')}
              isSelected={watch('currency') === 'PLN'}
            />
            <CheckableButton
              label='USD'
              onPress={() => setValue('currency', 'USD')}
              isSelected={watch('currency') === 'USD'}
            />
          </View>

          <Controller
            name='name'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Name'
                className='mb-4'
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={error?.message}
                onPress={() => inputButtonRef.current?.blur()}
              />
            )}
          />

          <Controller
            name='purchase_date'
            render={({ field }) => (
              <InputButton
                label='Purchase date'
                ref={inputButtonRef}
                onPress={openModal}
                value={format(field.value, 'yyyy-MM-dd')}
                className='mb-4'
              />
            )}
          />

          <Controller
            name='share_price'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Share price'
                placeholder={`0 ${watch('currency')}`}
                className='mb-4'
                value={field.value.toString()}
                keyboardType='decimal-pad'
                onChangeText={(value) => {
                  const formattedValue = Formatter.formatDecimalInput(value);
                  field.onChange(formattedValue);
                }}
                errorMessage={error?.message}
                onPress={() => inputButtonRef.current?.blur()}
              />
            )}
          />

          <Controller
            name='shares_amount'
            render={({ field, fieldState: { error } }) => (
              <Input
                label='Shares amount'
                className='mb-4'
                value={field.value.toString()}
                onChangeText={(value) => {
                  const formattedValue = Formatter.formatDecimalInput(value, 4);
                  field.onChange(formattedValue);
                }}
                errorMessage={error?.message}
                onPress={() => inputButtonRef.current?.blur()}
              />
            )}
          />

          <Button
            label='Add'
            className='mt-4'
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
            disabled={isPending}
          />
        </ScreenContentWrapper>
      </FormProvider>

      {IS_ANDROID && visible && (
        <DateTimePicker
          value={watch('purchase_date')}
          display='calendar'
          onChange={(event: DateTimePickerEvent, date) => {
            if (date) {
              setValue('purchase_date', date);
              closeModal();
            }
          }}
        />
      )}

      {IS_IOS && (
        <MainModal isVisible={visible} onClose={closeModal}>
          <DateTimePicker
            value={watch('purchase_date')}
            display='spinner'
            onChange={(event: DateTimePickerEvent, date) => {
              if (date) {
                setValue('purchase_date', date);
              }
            }}
          />

          <Button label='Close' onPress={closeModal} />
        </MainModal>
      )}
    </>
  );
};

export default AddInvestmentScreen;
