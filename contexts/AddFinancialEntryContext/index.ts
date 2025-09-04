import { createContext, useContext } from 'react';
import { AddFinancialEntryContextProps } from './types';

export const AddFinancialEntryContext =
  createContext<AddFinancialEntryContextProps>({
    type: 'expense',
    setType: () => {},
    amount: '0',
    setAmount: () => {},
    category_name: null,
    setCategoryName: () => {},
    subcategory_name: null,
    setSubcategoryName: () => {},
  });

export const AddFinancialEntryContextProvider =
  AddFinancialEntryContext.Provider;
export const useAddFinancialEntryContext = (): AddFinancialEntryContextProps =>
  useContext(AddFinancialEntryContext);
