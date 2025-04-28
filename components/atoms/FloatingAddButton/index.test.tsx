import { render, fireEvent } from 'setup/testing-library';
import FloatingAddButton from '.';
import { testIDs } from 'utils/testIDs';
describe('FloatingAddButton', () => {
  test('renders correctly', () => {
    render(<FloatingAddButton />);
  });

  test('calls onPress when clicked', () => {
    const handlePress = jest.fn();
    const { getByTestId } = render(<FloatingAddButton onPress={handlePress} />);
    const button = getByTestId(testIDs.floatingAddButton);
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
