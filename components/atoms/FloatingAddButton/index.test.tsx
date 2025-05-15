import { render, fireEvent } from 'setup/testing-library';
import FloatingAddButton from '.';
import { testIDs } from 'utils/testIDs';
describe('FloatingAddButton', () => {
  const handlePress = jest.fn();
  test('renders correctly', () => {
    render(<FloatingAddButton onPress={handlePress} />);
  });

  test('calls onPress when clicked', () => {
    const { getByTestId } = render(<FloatingAddButton onPress={handlePress} />);
    const button = getByTestId(testIDs.floatingAddButton);
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
