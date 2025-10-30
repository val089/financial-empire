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
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FPSMonitor from 'components/utils/FPSMonitor';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import AddFinancialEntryContextWrapper from 'contexts/AddFinancialEntryContext/AddFinancialEntryContextWrapper';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { supabase } from './lib/supabase/supabase';

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

  useEffect(() => {
    // Set up AppState listener for Supabase auth refresh
    // Only needed for native platforms (iOS/Android)
    if (Platform.OS !== 'web') {
      const subscription = AppState.addEventListener('change', (state) => {
        if (state === 'active') {
          supabase.auth.startAutoRefresh();
        } else {
          supabase.auth.stopAutoRefresh();
        }
      });

      // Cleanup function to remove the listener
      return () => {
        subscription.remove();
      };
    }
  }, []);

  return loaded ? (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextWrapper>
          <NavigationContainer onReady={() => SplashScreen.hide()}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <AddFinancialEntryContextWrapper>
                  <StatusBar style='dark' />
                  <RootNavigation />
                  {/* Global FPSMonitor - controlled by EXPO_PUBLIC_ENABLE_FPS_MONITOR */}
                  <FPSMonitor />
                </AddFinancialEntryContextWrapper>
              </GestureHandlerRootView>
            </SafeAreaProvider>
            <Toast />
          </NavigationContainer>
        </UserContextWrapper>
      </QueryClientProvider>
    </KeyboardProvider>
  ) : null;
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  SplashScreen.hide();
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
