import { FinancialEntryTypeList } from 'lib/supabase/types';
import { FinancialEntryContextDataType } from './types';

export const defaultFinancialEntry: Omit<
  FinancialEntryContextDataType,
  'id' | 'created_at'
> = {
  amount: '0',
  category_name: null,
  subcategory_name: null,
  type: FinancialEntryTypeList.expense,
  entry_date: new Date(),
};
