import { PostgrestError } from '@supabase/supabase-js';
import { UseMutationResult } from '@tanstack/react-query';
import { InvestmentItem, InvestmentItemInsert } from 'lib/supabase/types';

export type UseAddInvestmentMutationParameters = InvestmentItemInsert;

export type UseAddInvestmentMutationReturnType = UseMutationResult<
  InvestmentItem,
  PostgrestError,
  UseAddInvestmentMutationParameters
>;
