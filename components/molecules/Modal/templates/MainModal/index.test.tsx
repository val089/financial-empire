import { Text } from 'react-native';
import noop from 'lodash/noop';

import { render } from 'setup/testing-library';

import MainModal from '.';

describe('MainModal', () => {
  test('renders title correctly', () => {
    const text = <Text>title</Text>;
    const { getByText } = render(
      <MainModal isVisible onClose={noop}>
        {text}
      </MainModal>
    );

    expect(getByText('title')).toBeTruthy();
  });
});
