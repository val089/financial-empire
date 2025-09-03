import { ReactNode, ReactElement } from 'react';
import {
  render,
  RenderAPI,
  RenderOptions,
  renderHook as originalRenderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off for testing
      retry: false,
    },
    mutations: {
      // ✅ turns retries off for testing
      retry: false,
    },
  },
});

export const WithProviders = ({ children }: { children: ReactNode }) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderAPI =>
  render(ui, { wrapper: WithProviders, ...options });

const customRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
): RenderHookResult<TResult, TProps> =>
  originalRenderHook(callback, { wrapper: WithProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render, customRenderHook as renderHook };
