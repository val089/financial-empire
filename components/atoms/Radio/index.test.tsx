import { render, fireEvent } from '@testing-library/react-native';
import Radio from './index';
import { Text } from 'react-native';

describe('Radio component', () => {
  const handlePress = jest.fn();

  beforeEach(() => {
    handlePress.mockClear();
  });

  test('renders correctly with string label', () => {
    const { getByText } = render(
      <Radio
        label='Test Label'
        onPress={handlePress}
        isSelected={false}
        testID='radio'
      />
    );

    expect(getByText('Test Label')).toBeTruthy();
  });

  test('renders correctly with component label', () => {
    const { getByText } = render(
      <Radio
        label={<Text>Custom Label</Text>}
        onPress={handlePress}
        isSelected={false}
      />
    );

    expect(getByText('Custom Label')).toBeTruthy();
  });

  test('handles press events', () => {
    const { getByText } = render(
      <Radio label='Clickable' onPress={handlePress} isSelected={false} />
    );

    fireEvent.press(getByText('Clickable'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
