import { ReactNode, useState } from 'react';
import { AddFinancialEntryContextProvider } from '.';
import {
  CategoryFinancialEntryName,
  FinancialEntryType,
  SubcategoryFinancialEntryName,
} from 'lib/types';

const AddFinancialEntryContextWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [type, setType] = useState<FinancialEntryType>('expense');
  const [amount, setAmount] = useState('0');
  const [category_name, setCategoryName] = useState<
    CategoryFinancialEntryName | null | undefined
  >(null);
  const [subcategory_name, setSubcategoryName] = useState<
    SubcategoryFinancialEntryName | null | undefined
  >(null);

  return (
    <AddFinancialEntryContextProvider
      value={{
        type,
        setType,
        amount,
        setAmount,
        category_name,
        setCategoryName,
        subcategory_name,
        setSubcategoryName,
      }}
    >
      {children}
    </AddFinancialEntryContextProvider>
  );
};

export default AddFinancialEntryContextWrapper;
