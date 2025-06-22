import { FinancialEntry } from 'lib/types';
import { HomeStackParamList } from 'setup/navigation/HomeNavigation/types';
import { Screens } from 'utils/Screens';

export type FormData = Pick<FinancialEntry, 'category' | 'type'> & {
  amount: string;
};

export type AddFinancialEntryScreenProps = ScreenProps<
  HomeStackParamList,
  Screens.AddFinancialEntry
>;
