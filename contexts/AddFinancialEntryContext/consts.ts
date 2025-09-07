import { FinancialEntryTypeList } from 'lib/types';

export const defaultFinancialEntry = {
  amount: '0',
  category_name: null,
  subcategory_name: null,
  type: FinancialEntryTypeList.expense,
};
