import { ReactNode, ReactElement } from 'react';
import {
  render,
  RenderAPI,
  RenderOptions,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export const WithProviders = ({ children }: { children: ReactNode }) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderAPI =>
  render(ui, { wrapper: WithProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
