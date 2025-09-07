import { Dispatch, SetStateAction } from 'react';
import {
  CategoryFinancialEntryName,
  FinancialEntryType,
  SubcategoryFinancialEntryName,
} from 'lib/types';

export type FinancialEntryContextDataType = {
  amount: string;
  category_name: CategoryFinancialEntryName | null;
  subcategory_name: SubcategoryFinancialEntryName | null;
  type: FinancialEntryType;
};

export type AddFinancialEntryContextProps = {
  financialEntry: FinancialEntryContextDataType;
  setFinancialEntry: Dispatch<SetStateAction<FinancialEntryContextDataType>>;
  setDefaultValues: (entry: FinancialEntryContextDataType | null) => void;
  isEditting: boolean;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
};
