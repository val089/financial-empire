import { FinancialEntryTypeList } from 'lib/types';
import { FinancialEntryContextDataType } from './types';

export const defaultFinancialEntry: FinancialEntryContextDataType = {
  amount: '0',
  category_name: null,
  subcategory_name: null,
  type: FinancialEntryTypeList.expense,
};
