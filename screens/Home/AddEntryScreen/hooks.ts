import { useForm } from 'react-hook-form';
import { AddFinancialEntryScreenProps, FormData } from './types';
import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { FinancialEntryTypeList } from 'lib/types';
import { useCallback } from 'react';

export const useAddEntryScreen = ({
  navigation,
}: AddFinancialEntryScreenProps) => {
  const { mutate: addFinancialEntry } = useAddFinancialEntry();
  const { showDefaultToastOnError, showSuccessToast } = useDefaultToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    defaultValues: {
      type: FinancialEntryTypeList.expense,
      amount: 0,
    },
    mode: 'onChange',
  });

  const { setValue, watch } = methods;

  const onSubmit = (formData: FormData) => {
    addFinancialEntry(
      {
        ...formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [Queries.FinancialEntries],
          });
          queryClient.invalidateQueries({
            queryKey: [Queries.FinancialEntriesTotalAmount],
          });

          showSuccessToast('Financial entry added successfully!');

          navigation?.goBack();
        },
        onError: () => showDefaultToastOnError(),
      }
    );
  };

  const handleNumberPadOnChange = useCallback(
    (number: number) => {
      const amount =
        watch('type') === FinancialEntryTypeList.expense ? -number : number;
      setValue('amount', amount);
    },
    [setValue, watch]
  );

  return {
    onSubmit,
    formMethods: methods,
    handleNumberPadOnChange,
  };
};
