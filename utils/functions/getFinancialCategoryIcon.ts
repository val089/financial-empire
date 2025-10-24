import { CategoryFinancialEntryName } from 'lib/supabase/types';

export const getFinancialCategoryIcon = (
  categoryName: CategoryFinancialEntryName | null | undefined
) => {
  switch (categoryName) {
    case 'income':
      return 'cash-outline';
    case 'food & drinks':
      return 'restaurant-outline';
    case 'housing':
      return 'home-outline';
    case 'communication, pc':
      return 'tv-outline';
    case 'transportation':
      return 'bus-outline';
    case 'vehicle':
      return 'car-outline';
    case 'financial expenses':
      return 'pie-chart-outline';
    case 'investments':
      return 'cellular-outline';
    case 'life & entertainment':
      return 'man-outline';
    case 'shopping':
      return 'cart-outline';
    case 'others':
      return 'help-outline';
    default:
      return 'help-outline';
  }
};
