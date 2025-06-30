import { PostgrestError } from '@supabase/supabase-js';
import { UseMutationResult } from '@tanstack/react-query';
import { FinancialEntryInsert, FinancialEntry } from 'lib/types';

export type UseAddFinancialEntryMutationParameters = FinancialEntryInsert;

export type UseAddFinancialEntryMutationReturnType = UseMutationResult<
  FinancialEntry,
  PostgrestError,
  UseAddFinancialEntryMutationParameters
>;
