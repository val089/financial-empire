import { useForm } from 'react-hook-form';
import { AddFinancialEntryScreenProps, FormData } from './types';
import useAddFinancialEntry from 'api/mutations/useAddFinancialEntry';
import useDefaultToast from 'hooks/useDefaultToast';
import { useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api/enums';
import { FinancialEntryTypeList } from 'lib/types';
import { useCallback, useEffect } from 'react';

export const useAddFinancialEntryScreen = ({
  navigation,
  route,
}: AddFinancialEntryScreenProps) => {
  const { category_name, subcategory_name } = route?.params || {};
  const { mutate: addFinancialEntry } = useAddFinancialEntry();
  const { showDefaultToastOnError, showSuccessToast } = useDefaultToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    defaultValues: {
      type: FinancialEntryTypeList.expense,
      amount: 0,
      category_name: null,
      subcategory_name: null,
    },
    mode: 'onChange',
  });

  const { setValue, watch } = methods;

  useEffect(() => {
    if (category_name) {
      setValue('category_name', category_name);
    }
    if (subcategory_name) {
      setValue('subcategory_name', subcategory_name);
    }
    if (category_name && !subcategory_name) {
      setValue('subcategory_name', null);
    }
  }, [category_name, setValue, subcategory_name]);

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
          queryClient.invalidateQueries({
            queryKey: [Queries.MonthlyFinancialSummary],
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
