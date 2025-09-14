import { View } from 'react-native';
import useCategoriesFinancialEntries from 'api/queries/useCategoriesFinancialEntries';
import { Loader, CategoryButton, ScreenContentWrapper } from 'components/atoms';
import { ScreenHeader } from 'components/organisms';
import { CategoryFinancialEntriesScreenProps } from './types';
import { Screens } from 'utils/Screens';
import Toast from 'react-native-toast-message';
import { useAddFinancialEntryContext } from 'contexts/AddFinancialEntryContext';

const CategoryFinancialEntriesScreen = ({
  navigation,
}: CategoryFinancialEntriesScreenProps) => {
  const { setFinancialEntry } = useAddFinancialEntryContext();
  const { data: categories, isLoading } = useCategoriesFinancialEntries();

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Loader />
      </View>
    );
  }

  return (
    <>
      <ScreenHeader
        onBackPress={() => navigation?.goBack()}
        title='Choose category'
      />
      <ScreenContentWrapper className='p-0' isScrollable>
        {categories?.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.name || 'Category name missing'}
            categoryName={category.name || 'others'}
            onPress={() => {
              if (!category.name) {
                Toast.show({
                  type: 'error',
                  text1: 'This category does not have subcategories',
                  position: 'bottom',
                });
                return;
              }

              setFinancialEntry((prevState) => ({
                ...prevState,
                category_name: category.name,
              }));
              navigation?.navigate(Screens.SubcategoryFinancialEntries);
            }}
          />
        ))}
      </ScreenContentWrapper>
    </>
  );
};

export default CategoryFinancialEntriesScreen;
