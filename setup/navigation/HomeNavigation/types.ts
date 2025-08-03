import {
  CategoryFinancialEntryName,
  SubcategoryFinancialEntryName,
} from 'lib/types';
import { Screens } from 'utils/Screens';

export type HomeStackParamList = {
  [Screens.Home]: undefined;
  [Screens.FinancialEntries]: undefined;
  [Screens.AddFinancialEntry]: {
    category_name?: CategoryFinancialEntryName | null;
    subcategory_name?: SubcategoryFinancialEntryName | null;
  };
  [Screens.CategoryFinancialEntries]: undefined;
  [Screens.SubcategoryFinancialEntries]: {
    category_name: CategoryFinancialEntryName;
  };
};
