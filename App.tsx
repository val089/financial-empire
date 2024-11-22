import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './setup/navigation/RootNavigation';
import UserContextWrapper from './contexts/UserContext/UserContextWrapper';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextWrapper>
        <NavigationContainer>
          <SafeAreaProvider>
            <StatusBar style='dark' />
            <RootNavigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </UserContextWrapper>
    </QueryClientProvider>
  );
}
