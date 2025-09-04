import { CategoryFinancialEntryName } from 'lib/types';
import { Screens } from 'utils/Screens';

export type HomeStackParamList = {
  [Screens.Home]: undefined;
  [Screens.FinancialEntries]: undefined;
  [Screens.AddFinancialEntry]: undefined;
  [Screens.CategoryFinancialEntries]: undefined;
  [Screens.SubcategoryFinancialEntries]: {
    category_name: CategoryFinancialEntryName;
  };
};
