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

  test('renders with avatar', () => {
    const { getByTestId } = render(
      <ScreenHeader avatarUrl='https://example.com/avatar.png' />
    );
    expect(getByTestId(testIDs.avatar)).toBeTruthy();
  });

  test('renders without avatar', () => {
    const { queryByTestId } = render(<ScreenHeader />);
    expect(queryByTestId(testIDs.avatar)).toBeNull();
  });

  test('renders with back button', () => {
    const { getByTestId } = render(<ScreenHeader onBackPress={() => {}} />);
    expect(getByTestId(testIDs.arrowLeftButton)).toBeTruthy();
  });

  test('renders without back button', () => {
    const { queryByTestId } = render(<ScreenHeader />);
    expect(queryByTestId(testIDs.arrowLeftButton)).toBeNull();
  });
});
