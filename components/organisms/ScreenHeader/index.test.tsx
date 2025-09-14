import { render } from 'setup/testing-library';
import ScreenHeader from '.';
import { testIDs } from 'utils/testIDs';

describe('ScreenHeader', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<ScreenHeader />);
    expect(getByTestId(testIDs.screenHeader)).toBeTruthy();
  });

  test('renders with title', () => {
    const { getByText } = render(<ScreenHeader title='Title' />);
    expect(getByText('Title')).toBeTruthy();
  });

  test('renders without title', () => {
    const { queryByText } = render(<ScreenHeader />);
    expect(queryByText('Title')).toBeNull();
  });

  // TODO: replace test for avatar, avatar picker will move to Profile Screen
  test('renders with avatar picker', () => {
    const { getByTestId } = render(
      <ScreenHeader
        avatarUrl='https://example.com/avatar.png'
        onUpload={() => {}}
      />
    );
    expect(getByTestId(testIDs.avatarPicker)).toBeTruthy();
  });

  test('renders without avatar', () => {
    const { queryByTestId } = render(<ScreenHeader />);
    expect(queryByTestId(testIDs.avatarPicker)).toBeNull();
  });

  test('renders with back button', () => {
    const { getByTestId } = render(<ScreenHeader onBackPress={() => {}} />);
    expect(getByTestId(testIDs.arrowLeftButton)).toBeTruthy();
  });

  test('renders without back button', () => {
    const { queryByTestId } = render(<ScreenHeader />);
    expect(queryByTestId(testIDs.arrowLeftButton)).toBeNull();
  });

  test('renders with main side menu icons', () => {
    const { getByTestId } = render(<ScreenHeader showMainSideMenu={true} />);
    expect(getByTestId(testIDs.logoutButton)).toBeTruthy();
  });
});
