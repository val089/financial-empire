import { render, fireEvent } from 'setup/testing-library';
import InputButton from '.';
import { testIDs } from 'utils/testIDs';
import { Keyboard } from 'react-native';

describe('InputButton', () => {
  const handlePress = jest.fn();
  test('renders correctly', () => {
    render(<InputButton onPress={handlePress} />);
  });

  test('calls onPress when pressed', () => {
    const { getByTestId } = render(<InputButton onPress={handlePress} />);
    fireEvent.press(getByTestId(testIDs.inputButton));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test('displays label when provided', () => {
    const { getByText } = render(
      <InputButton onPress={handlePress} label='Test Label' />
    );
    expect(getByText('Test Label')).toBeTruthy();
  });

  test('displays value when provided', () => {
    const { getByText } = render(
      <InputButton onPress={handlePress} value='Test Value' />
    );
    expect(getByText('Test Value')).toBeTruthy();
  });

  test('displays placeholder when no value is provided', () => {
    const { getByText } = render(
      <InputButton onPress={handlePress} placeholder='Test Placeholder' />
    );
    expect(getByText('Test Placeholder')).toBeTruthy();
  });

  test('display error message when provided', () => {
    const { getByText } = render(
      <InputButton onPress={handlePress} errorMessage='Test Error Message' />
    );
    expect(getByText('Test Error Message')).toBeTruthy();
  });

  test('is focused state changes on press', () => {
    const { getByTestId } = render(<InputButton onPress={handlePress} />);
    const button = getByTestId(testIDs.inputButton);
    fireEvent.press(button);
    expect(button.props.accessibilityState.selected).toBe(true);
  });

  test('is keyboard dismissed on press', () => {
    const dismissSpy = jest.spyOn(Keyboard, 'dismiss');
    const { getByTestId } = render(<InputButton onPress={handlePress} />);
    const button = getByTestId(testIDs.inputButton);
    fireEvent.press(button);
    expect(dismissSpy).toHaveBeenCalled();
  });
});
