import { useState } from 'react';
import { render } from 'setup/testing-library';
import { fireEvent } from '@testing-library/react-native';
import PasswordInput from '.';
import { testIDs } from 'utils/testIDs';

const placeholder = 'Test';

const ExamplePasswordInput = () => {
  const [value, setValue] = useState('');

  return (
    <PasswordInput
      onChangeText={(v) => setValue(v)}
      {...{ placeholder, value }}
    />
  );
};

describe('PasswordInput', () => {
  test('render eye icon correctly', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ExamplePasswordInput />
    );

    fireEvent.changeText(getByPlaceholderText(placeholder), 'test');

    expect(getByTestId(testIDs.inputRightIcon)).toBeTruthy();
  });

  test('toggle password visibility', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ExamplePasswordInput />
    );
    // check if password is hidden
    const inputField = getByPlaceholderText(placeholder);
    expect(inputField.props.secureTextEntry).toBe(true);

    // check if eye icon is rendered
    fireEvent.changeText(inputField, 'test');
    const eyeIcon = getByTestId(testIDs.inputRightIcon);
    expect(eyeIcon).toBeTruthy();

    // check if password is visible
    fireEvent.press(eyeIcon);
    expect(inputField.props.secureTextEntry).toBe(false);
  });

  test('does not render eye icon when value is empty', () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <ExamplePasswordInput />
    );

    const inputField = getByPlaceholderText(placeholder);
    expect(inputField.props.secureTextEntry).toBe(true);

    fireEvent.changeText(inputField, 'test');
    expect(queryByTestId(testIDs.inputRightIcon)).toBeTruthy();

    fireEvent.changeText(inputField, '');
    expect(queryByTestId(testIDs.inputRightIcon)).toBeNull();
  });
});
