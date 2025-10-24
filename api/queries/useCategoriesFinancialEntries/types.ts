import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { CategoryFinancialEntry } from 'lib/supabase/types';

export type UseCategoriesFinancialEntriesQueryReturnType = UseQueryResult<
  CategoryFinancialEntry[] | null
>;

export type UseCategoriesFinancialEntriesQueryOptions = UseQueryOptions<
  CategoryFinancialEntry[] | null
>;
