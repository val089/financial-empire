import { Text } from 'react-native';
import noop from 'lodash/noop';
import { fireEvent, render } from 'setup/testing-library';
import Modal from '.';
import { testIDs } from 'utils/testIDs';

describe('Modal', () => {
  test('renders children correctly', () => {
    const text = <Text>content</Text>;
    const { getByText } = render(
      <Modal isVisible onClose={noop}>
        {text}
      </Modal>
    );

    expect(getByText('content')).toBeTruthy();
  });

  test('calls onClose when backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isVisible onClose={onClose}>
        <Text>content</Text>
      </Modal>
    );

    const backdrop = getByTestId(testIDs.modalBackdrop);
    fireEvent.press(backdrop);

    expect(onClose).toHaveBeenCalled();
  });
});
