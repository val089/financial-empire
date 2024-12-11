import { ReactNode, ReactElement } from 'react';
import {
  render,
  RenderAPI,
  RenderOptions,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const WithProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>{children}</NavigationContainer>
  </QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderAPI =>
  render(ui, { wrapper: WithProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
