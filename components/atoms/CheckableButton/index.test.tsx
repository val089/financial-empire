import { screen, fireEvent } from '@testing-library/react-native';
import { render } from 'setup/testing-library';
import CheckableButton from '.';

describe('CheckableButton', () => {
  const label = 'Test Button';
  test('renders correctly', () => {
    render(<CheckableButton onPress={() => {}} label={label} isSelected />);
    expect(screen.getByText(label)).toBeTruthy();
  });

  test('calls onPress when clicked', () => {
    const handlePress = jest.fn();
    render(<CheckableButton onPress={handlePress} label={label} isSelected />);
    fireEvent.press(screen.getByText(label));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
