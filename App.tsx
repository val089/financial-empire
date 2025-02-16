import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './setup/navigation/RootNavigation';
import UserContextWrapper from './contexts/UserContext/UserContextWrapper';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { InterLight, InterRegular, InterMedium, InterBold } from 'assets/fonts';
import * as SplashScreen from 'expo-splash-screen';

import './theme/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const queryClient = new QueryClient();

const App = () => {
  const [loaded] = useFonts({
    InterLight,
    InterRegular,
    InterMedium,
    InterBold,
  });

  return loaded ? (
    <QueryClientProvider client={queryClient}>
      <UserContextWrapper>
        <NavigationContainer onReady={() => SplashScreen.hide()}>
          <SafeAreaProvider>
            <StatusBar style='dark' />
            <RootNavigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </UserContextWrapper>
    </QueryClientProvider>
  ) : null;
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
