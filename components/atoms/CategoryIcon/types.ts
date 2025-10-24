import { CategoryFinancialEntryName } from 'lib/supabase/types';

export interface CategoryIconProps {
  categoryName: CategoryFinancialEntryName | null | undefined;
  size?: number;
}
