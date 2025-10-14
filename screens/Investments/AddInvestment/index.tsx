import { Text, View } from 'react-native';
import { ScreenHeader } from 'components/organisms';
import { AddInvestmentScreenProps } from './types';

const AddInvestmentScreen = ({ navigation }: AddInvestmentScreenProps) => (
  <>
    <ScreenHeader
      title='Add Investment'
      onBackPress={() => navigation?.goBack()}
    />
    <View className='flex-1 justify-center items-center'>
      <Text className='text-h1'>ADD INVESTMENT</Text>
    </View>
  </>
);

export default AddInvestmentScreen;
