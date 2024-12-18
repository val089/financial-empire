import { render } from 'setup/testing-library';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import Input from '.';

describe('Input', () => {
  test('renders label correctly', () => {
    const { getByText } = render(<Input label='Label' />);
    expect(getByText('Label')).toBeTruthy();
  });

  test('renders error message correctly', () => {
    const { getByText } = render(<Input errorMessage='Error message' />);
    expect(getByText('Error message')).toBeTruthy();
  });

  test('renders left icon correctly', () => {
    const leftIcon = () => <Text>Left Icon</Text>;

    const { getByText } = render(
      <Input
        leftIcon={{
          icon: leftIcon,
        }}
      />
    );

    expect(getByText('Left Icon')).toBeTruthy();
  });

  test('renders right icon correctly', () => {
    const rightIcon = () => <Text>Right Icon</Text>;

    const { getByText } = render(
      <Input
        rightIcon={{
          icon: rightIcon,
        }}
      />
    );

    expect(getByText('Right Icon')).toBeTruthy();
  });

  test('calls onPressLeftIcon when left icon is pressed', () => {
    const onPressLeftIcon = jest.fn();
    const leftIcon = () => <Text>Left Icon</Text>;

    const { getByText } = render(
      <Input
        leftIcon={{
          icon: leftIcon,
          onPress: onPressLeftIcon,
        }}
      />
    );

    fireEvent(getByText('Left Icon'), 'press');

    expect(onPressLeftIcon).toHaveBeenCalled();
  });

  test('calls onPressRightIcon when right icon is pressed', () => {
    const onPressRightIcon = jest.fn();
    const rightIcon = () => <Text>Right Icon</Text>;

    const { getByText } = render(
      <Input
        rightIcon={{
          icon: rightIcon,
          onPress: onPressRightIcon,
        }}
      />
    );

    fireEvent(getByText('Right Icon'), 'press');

    expect(onPressRightIcon).toHaveBeenCalled();
  });

  test('changes text correctly', () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder='Placeholder' onChangeText={onChangeText} />
    );

    fireEvent.changeText(getByPlaceholderText('Placeholder'), 'text');

    expect(onChangeText).toHaveBeenCalledWith('text');
  });
});
