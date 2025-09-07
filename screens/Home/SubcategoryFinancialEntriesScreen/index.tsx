import { Text, TouchableOpacity } from 'react-native';
import { SubcategoryFinancialEntriesScreenProps } from './types';
import useSubcategoryFinancialEntries from 'api/queries/useSubcategoryFinancialEntries';
import { ScreenHeader } from 'components/organisms';
import { Loader, ScreenContentWrapper } from 'components/atoms';
import CategoryIcon from 'components/atoms/CategoryIcon';
import { Screens } from 'utils/Screens';
import { useAddFinancialEntryContext } from 'contexts/AddFinancialEntryContext';

const SubcategoryFinancialEntriesScreen = ({
  navigation,
}: SubcategoryFinancialEntriesScreenProps) => {
  const { setFinancialEntry, financialEntry } = useAddFinancialEntryContext();

  const { data: subcategories, isLoading } = useSubcategoryFinancialEntries({
    category_name: financialEntry.category_name,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScreenHeader
        onBackPress={() => navigation?.goBack()}
        title={financialEntry.category_name || ''}
      />
      <ScreenContentWrapper className='p-0'>
        <TouchableOpacity
          className='flex-row my-5 items-center p-4 border-y border-gray-200'
          onPress={() => {
            setFinancialEntry((prevState) => ({
              ...prevState,
              category_name: financialEntry.category_name,
              subcategory_name: null,
              amount: '0',
              type: 'expense',
            }));
            navigation?.navigate(Screens.AddFinancialEntry, {});
          }}
        >
          <CategoryIcon categoryName={financialEntry.category_name} />
          <Text className='text-h4 font-interRegular ml-4'>
            {financialEntry.category_name}
          </Text>
        </TouchableOpacity>

        {subcategories && subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <TouchableOpacity
              key={subcategory.id}
              className='flex-row justify-between items-center p-4 border-b border-gray-200'
              onPress={() => {
                setFinancialEntry((prevState) => ({
                  ...prevState,
                  category_name: financialEntry.category_name,
                  subcategory_name: subcategory.name,
                }));
                navigation?.popTo(Screens.AddFinancialEntry, {});
              }}
            >
              <Text className='text-h4 font-interRegular'>
                {subcategory.name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className='text-h4 font-interRegular text-center'>
            No subcategories found.
          </Text>
        )}
      </ScreenContentWrapper>
    </>
  );
};

export default SubcategoryFinancialEntriesScreen;
