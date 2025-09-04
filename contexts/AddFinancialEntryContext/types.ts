import { Dispatch, SetStateAction } from 'react';
import {
  CategoryFinancialEntryName,
  FinancialEntryType,
  SubcategoryFinancialEntryName,
} from 'lib/types';

export type AddFinancialEntryContextProps = {
  type: FinancialEntryType;
  setType: Dispatch<SetStateAction<FinancialEntryType>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  category_name: CategoryFinancialEntryName | null | undefined;
  setCategoryName: Dispatch<
    SetStateAction<CategoryFinancialEntryName | null | undefined>
  >;
  subcategory_name: SubcategoryFinancialEntryName | null | undefined;
  setSubcategoryName: Dispatch<
    SetStateAction<SubcategoryFinancialEntryName | null | undefined>
  >;
};
