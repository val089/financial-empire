import { screen, fireEvent } from '@testing-library/react-native';
import { render } from 'setup/testing-library';
import ArrowLeftButton from './index';
import { testIDs } from 'utils/testIDs';

describe('ArrowLeftButton', () => {
  test('renders correctly', () => {
    render(<ArrowLeftButton onPress={() => {}} />);
    expect(screen.getByTestId(testIDs.arrowLeftButton)).toBeTruthy();
  });

  test('calls onPress when clicked', () => {
    const handlePress = jest.fn();
    render(<ArrowLeftButton onPress={handlePress} />);
    fireEvent.press(screen.getByTestId(testIDs.arrowLeftButton));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
