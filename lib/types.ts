import { Database } from './database.types';

export type FinancialEntry =
  Database['public']['Tables']['financial-entries']['Row'];

export type FinancialEntryInsert =
  Database['public']['Tables']['financial-entries']['Insert'];

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type FinancialEntryType =
  Database['public']['Enums']['FinancialEntryType'];

export const FinancialEntryTypeList = {
  expense: 'expense',
  income: 'income',
} as const satisfies Record<FinancialEntryType, FinancialEntryType>;

export type CategoryFinancialEntry =
  Database['public']['Tables']['categories-financial-entries']['Row'];

export type CategoryFinancialEntryName =
  Database['public']['Enums']['CategoryFinancialEntryName'];

export type SubcategoryFinancialEntry =
  Database['public']['Tables']['subcategories-financial-entries']['Row'];

export type SubcategoryFinancialEntryName =
  Database['public']['Enums']['SubcategoryFinancialEntryName'];
