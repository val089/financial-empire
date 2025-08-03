import { FinancialEntry } from 'lib/types';
import { HomeStackParamList } from 'setup/navigation/HomeNavigation/types';
import { Screens } from 'utils/Screens';

export type FormData = Pick<
  FinancialEntry,
  'category_name' | 'type' | 'amount' | 'subcategory_name'
>;

export type AddFinancialEntryScreenProps = ScreenProps<
  HomeStackParamList,
  Screens.AddFinancialEntry
>;
