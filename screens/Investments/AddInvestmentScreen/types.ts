import { InvestmentsStackParamList } from 'setup/navigation/InvestmentsNavigation/types';
import { Screens } from 'utils/Screens';
import { z } from 'zod';

export type AddInvestmentScreenProps = ScreenProps<
  InvestmentsStackParamList,
  Screens.AddInvestment
>;

// TODO: Adjust validation rules
export const AddInvestmentSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be between 3 and 30 characters')
    .max(30, 'Name must be between 3 and 30 characters'),
  purchase_date: z.date(),
  share_price: z.string(),
  shares_amount: z.string(),
  currency: z.string(),
});

export type AddInvestmentFormData = z.infer<typeof AddInvestmentSchema>;
