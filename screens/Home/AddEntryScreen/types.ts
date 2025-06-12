import { FinancialEntry } from 'lib/types';

export type FormData = Pick<FinancialEntry, 'amount' | 'category' | 'type'>;
