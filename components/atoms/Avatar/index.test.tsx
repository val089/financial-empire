import { render } from 'setup/testing-library';
import Avatar from '.';
import { testIDs } from 'utils/testIDs';

describe('Avatar', () => {
  test('renders Avatar when url is provided', () => {
    const { getByTestId } = render(
      <Avatar url='https://example.com/avatar.png' />
    );
    const avatar = getByTestId(testIDs.avatar);
    expect(avatar).toBeTruthy();
    expect(avatar.props.source.uri).toBe('https://example.com/avatar.png');
  });

  test('renders Avatar placeholder when url is not provided', () => {
    const { getByTestId } = render(<Avatar url='' />);
    expect(getByTestId(testIDs.avatarPlaceholder)).toBeTruthy();
  });

  test('renders Avatar loader when isLoading is true', () => {
    const { getByTestId } = render(<Avatar isLoading />);
    expect(getByTestId(testIDs.avatarLoader)).toBeTruthy();
  });
});
