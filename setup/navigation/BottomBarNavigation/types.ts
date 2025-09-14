import { HomeStackParamList } from '../HomeNavigation/types';
import { Navigators } from 'utils/Navigators';
import { FinancialEntriesStackParamList } from '../FinancialEntriesNavigation/types';

export type BottomBarStackParamList = {
  [Navigators.Home]: HomeStackParamList;
  [Navigators.FinancialEntries]: FinancialEntriesStackParamList;
};
