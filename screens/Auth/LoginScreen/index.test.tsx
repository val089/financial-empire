import { render, waitFor, fireEvent } from 'setup/testing-library';
import LoginScreen from '.';
import useLoginMutation from 'api/mutations/useLoginMutation';

jest.mock('api/mutations/useLoginMutation');
const mockUseLoginMutation = useLoginMutation as jest.MockedFunction<
  typeof useLoginMutation
>;

describe('LoginScreen', () => {
  const defaultMutationState = {
    mutate: jest.fn(),
    isPending: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    error: null,
    data: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show button loader when mutation is pending', async () => {
    mockUseLoginMutation.mockReturnValue({
      ...defaultMutationState,
      isPending: true,
      isIdle: false,
    } as any);

    const { getByTestId } = render(<LoginScreen />);

    expect(getByTestId('button-loader')).toBeTruthy();
  });

  it('should not show button loader when mutation is not pending', async () => {
    mockUseLoginMutation.mockReturnValue({
      ...defaultMutationState,
      isPending: false,
      isIdle: true,
    } as any);

    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('should call mutate when form is submitted with valid data', async () => {
    const mockMutate = jest.fn();
    mockUseLoginMutation.mockReturnValue({
      ...defaultMutationState,
      mutate: mockMutate,
    } as any);

    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('email@address.com'),
      'test@example.com'
    );

    fireEvent.changeText(getByPlaceholderText('*******'), 'password123');

    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.any(Object)
      );
    });
  });

  it('should disable button when mutation is pending', async () => {
    mockUseLoginMutation.mockReturnValue({
      ...defaultMutationState,
      isPending: true,
    } as any);

    const { getByTestId } = render(<LoginScreen />);

    const loginButton = getByTestId('login-button');
    expect(loginButton.props.accessibilityState?.disabled).toBe(true);
  });

  it('should not submit with empty fields', async () => {
    const mockMutate = jest.fn();
    mockUseLoginMutation.mockReturnValue({
      ...defaultMutationState,
      mutate: mockMutate,
    } as any);

    const { getByTestId } = render(<LoginScreen />);

    fireEvent.press(getByTestId('login-button'));

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
