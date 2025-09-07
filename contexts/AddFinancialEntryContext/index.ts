import { createContext, useContext } from 'react';
import { AddFinancialEntryContextProps } from './types';
import { defaultFinancialEntry } from './consts';

export const AddFinancialEntryContext =
  createContext<AddFinancialEntryContextProps>({
    financialEntry: defaultFinancialEntry,
    isEditting: false,
    setIsEditting: () => {},
    setFinancialEntry: () => {},
    setDefaultValues: () => {},
  });

export const AddFinancialEntryContextProvider =
  AddFinancialEntryContext.Provider;
export const useAddFinancialEntryContext = (): AddFinancialEntryContextProps =>
  useContext(AddFinancialEntryContext);
