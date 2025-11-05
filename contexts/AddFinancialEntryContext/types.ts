import { Dispatch, SetStateAction } from 'react';
import {
  CategoryFinancialEntryName,
  FinancialEntryType,
  SubcategoryFinancialEntryName,
} from 'lib/supabase/types';

export type FinancialEntryContextDataType = {
  id: number;
  amount: string;
  category_name: CategoryFinancialEntryName | null;
  subcategory_name: SubcategoryFinancialEntryName | null;
  type: FinancialEntryType;
  entry_date: Date | null;
  created_at: Date;
};

export type AddFinancialEntryContextProps = {
  financialEntry: FinancialEntryContextDataType;
  setFinancialEntry: Dispatch<SetStateAction<FinancialEntryContextDataType>>;
  setDefaultValues: (entry: FinancialEntryContextDataType | null) => void;
  isEditting: boolean;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
};
