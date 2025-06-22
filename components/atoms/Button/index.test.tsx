import { screen, fireEvent } from '@testing-library/react-native';
import { render } from 'setup/testing-library';
import Button from '.';

describe('Button', () => {
  const label = 'Test Button';
  test('renders correctly', () => {
    render(<Button onPress={() => {}} label={label} />);
    expect(screen.getByText(label)).toBeTruthy();
  });

  test('calls onPress when clicked', () => {
    const handlePress = jest.fn();
    render(<Button onPress={handlePress} label={label} />);
    fireEvent.press(screen.getByText(label));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
