import { Text, View } from 'react-native';
import { ScreenHeader } from 'components/organisms';
import { InvestmentsScreenProps } from './types';
import { Button } from 'components/atoms';
import { Screens } from 'utils/Screens';

const InvestmentsScreen = ({ navigation }: InvestmentsScreenProps) => (
  <>
    <ScreenHeader title='Investments' />
    <View className='flex-1 p-4 justify-center items-center'>
      <Text className='text-h1'>INVESTMENTS</Text>

      <Button
        className='mt-10'
        label='Go to Add Investment Screen'
        onPress={() => navigation?.navigate(Screens.AddInvestment)}
      />
    </View>
  </>
);

export default InvestmentsScreen;
