import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import {
  CategoryFinancialEntryName,
  SubcategoryFinancialEntry,
} from 'lib/supabase/types';

export type UseSubcategoryFinancialEntriesQueryParameters = {
  category_name: CategoryFinancialEntryName | undefined | null;
};

export type UseSubcategoryFinancialEntriesQueryReturnType = UseQueryResult<
  SubcategoryFinancialEntry[] | null
>;

export type UseSubcategoryFinancialEntriesQueryOptions = UseQueryOptions<
  SubcategoryFinancialEntry[] | null
>;
