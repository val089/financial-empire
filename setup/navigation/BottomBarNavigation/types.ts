import { HomeStackParamList } from '../HomeNavigation/types';
import { Navigators } from 'utils/Navigators';
import { FinancialEntriesStackParamList } from '../FinancialEntriesNavigation/types';

export type BottomBarStackParamList = {
  [Navigators.HomeNavigation]: HomeStackParamList;
  [Navigators.FinancialEntriesNavigation]: FinancialEntriesStackParamList;
  [Navigators.InvestmentsNavigation]: undefined;
};
