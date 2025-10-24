import { PostgrestError } from '@supabase/supabase-js';
import { UseMutationResult } from '@tanstack/react-query';
import { FinancialEntryUpdate } from 'lib/supabase/types';

export type UseEditFinancialEntryParameters = FinancialEntryUpdate & {
  id: number;
};

export type UseEditFinancialEntryReturnType = UseMutationResult<
  null,
  PostgrestError,
  UseEditFinancialEntryParameters
>;
