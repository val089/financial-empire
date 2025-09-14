import { Screens } from 'utils/Screens';

export type FinancialEntriesStackParamList = {
  [Screens.FinancialEntries]: undefined;
  [Screens.AddFinancialEntry]: {
    financialEntryId?: number;
  };
  [Screens.CategoryFinancialEntries]: undefined;
  [Screens.SubcategoryFinancialEntries]: undefined;
};
