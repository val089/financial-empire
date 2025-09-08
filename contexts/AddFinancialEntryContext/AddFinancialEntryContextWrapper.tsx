import { ReactNode, useState } from 'react';
import { AddFinancialEntryContextProvider } from '.';
import { FinancialEntryContextDataType } from './types';
import { defaultFinancialEntry } from './consts';

const AddFinancialEntryContextWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [financialEntry, setFinancialEntry] =
    useState<FinancialEntryContextDataType>(defaultFinancialEntry);
  const [isEditting, setIsEditting] = useState(false);

  const setDefaultValues = (entry: FinancialEntryContextDataType | null) => {
    setFinancialEntry(entry || defaultFinancialEntry);
  };

  return (
    <AddFinancialEntryContextProvider
      value={{
        financialEntry,
        setFinancialEntry,
        setDefaultValues,
        isEditting,
        setIsEditting,
      }}
    >
      {children}
    </AddFinancialEntryContextProvider>
  );
};

export default AddFinancialEntryContextWrapper;
