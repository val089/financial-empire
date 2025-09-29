import { fireEvent, render } from 'setup/testing-library';
import EditableAvatar from '.';
import { testIDs } from 'utils/testIDs';

// Mock the useImagePicker hook
const mockPickImage = jest.fn();
jest.mock('hooks/useImagePicker', () => ({
  __esModule: true, // with esModule jest properly handles the default export
  default: () => ({
    pickImage: mockPickImage,
  }),
}));

// Mock the upload avatar mutation
const mockUploadAvatar = jest.fn();
const mockUploadAvatarState = { isPending: false };
jest.mock('api/mutations/useUploadAvatarMutation', () => ({
  __esModule: true, // with esModule jest properly handles the default export
  default: () => ({
    mutate: mockUploadAvatar,
    isPending: mockUploadAvatarState.isPending,
  }),
}));

// Mock the update user profile mutation
const mockUpdateUserProfile = jest.fn();
const mockUpdateUserProfileState = { isPending: false };
jest.mock('api/mutations/useUpdateUserProfileMutation', () => ({
  __esModule: true,
  default: () => ({
    mutate: mockUpdateUserProfile,
    isPending: mockUpdateUserProfileState.isPending,
  }),
}));

describe('EditableAvatar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadAvatarState.isPending = false;
    mockUpdateUserProfileState.isPending = false;
  });

  it('should render successfully', () => {
    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );
    expect(getByTestId(testIDs.avatar)).toBeTruthy();
  });

  it('should render placeholder when no URL is provided', () => {
    const { getByTestId } = render(<EditableAvatar url={null} />);
    expect(getByTestId(testIDs.avatarPlaceholder)).toBeTruthy();
  });

  it('should call pickImage when avatar is pressed', () => {
    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );
    const avatarTouchable = getByTestId(testIDs.editableAvatarTouchable);
    fireEvent.press(avatarTouchable);
    expect(mockPickImage).toHaveBeenCalledTimes(1);
    expect(mockPickImage).toHaveBeenCalledWith({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  });

  it('should render with custom size prop', () => {
    const customSize = 120;
    const { getByTestId } = render(
      <EditableAvatar
        url={'https://example.com/avatar.png'}
        size={customSize}
      />
    );
    const touchable = getByTestId(testIDs.editableAvatarTouchable);

    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        width: customSize,
        height: customSize,
      })
    );
  });

  it('should render with default size when size prop is not provided', () => {
    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );
    const touchable = getByTestId(testIDs.editableAvatarTouchable);

    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        width: 80,
        height: 80,
      })
    );
  });

  it('should show loading state when uploading avatar', () => {
    mockUploadAvatarState.isPending = true;
    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    expect(getByTestId(testIDs.loader)).toBeTruthy();
  });

  it('should show loading state when updating user profile', () => {
    mockUpdateUserProfileState.isPending = true;
    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    expect(getByTestId(testIDs.loader)).toBeTruthy();
  });

  it('should handle image picker result and upload avatar', async () => {
    const mockImageResult = { uri: 'file://image.jpg' };
    mockPickImage.mockResolvedValueOnce(mockImageResult);

    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    const avatarTouchable = getByTestId(testIDs.editableAvatarTouchable);
    fireEvent.press(avatarTouchable);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockUploadAvatar).toHaveBeenCalledWith(
      mockImageResult,
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it('should not upload avatar when image picker returns no result', async () => {
    mockPickImage.mockResolvedValueOnce(null);

    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    const avatarTouchable = getByTestId(testIDs.editableAvatarTouchable);
    fireEvent.press(avatarTouchable);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockUploadAvatar).not.toHaveBeenCalled();
  });

  it('should update user profile when avatar upload succeeds', async () => {
    const mockImageResult = { uri: 'file://image.jpg' };
    const mockUploadData = { path: 'uploads/avatar.jpg' };

    mockPickImage.mockResolvedValueOnce(mockImageResult);

    // Mock the upload avatar to call onSuccess immediately
    mockUploadAvatar.mockImplementationOnce((imageResult, { onSuccess }) => {
      onSuccess(mockUploadData);
    });

    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    const avatarTouchable = getByTestId(testIDs.editableAvatarTouchable);
    fireEvent.press(avatarTouchable);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockUpdateUserProfile).toHaveBeenCalledWith({
      avatar_url: mockUploadData.path,
    });
  });

  it('should not update user profile when upload data has no path', async () => {
    const mockImageResult = { uri: 'file://image.jpg' };
    const mockUploadData = { path: null };

    mockPickImage.mockResolvedValueOnce(mockImageResult);

    // Mock the upload avatar to call onSuccess immediately
    mockUploadAvatar.mockImplementationOnce((imageResult, { onSuccess }) => {
      onSuccess(mockUploadData);
    });

    const { getByTestId } = render(
      <EditableAvatar url={'https://example.com/avatar.png'} />
    );

    const avatarTouchable = getByTestId(testIDs.editableAvatarTouchable);
    fireEvent.press(avatarTouchable);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockUpdateUserProfile).not.toHaveBeenCalled();
  });
});
