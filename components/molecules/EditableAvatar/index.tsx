import { Avatar } from 'components/atoms';
import { TouchableOpacity, View } from 'react-native';
import { EditableAvatarProps } from './types';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';
import useImagePicker from 'hooks/useImagePicker';
import useUploadAvatarMutation from 'api/mutations/useUploadAvatarMutation';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';

/**
 * EditableAvatar Component - Avatar Upload with Smooth Loading States
 *
 * PROBLEM SOLVED:
 * Previously, during avatar upload, users experienced UI flickering where:
 * 1. Old avatar would briefly flash/disappear during upload process
 * 2. Placeholder icon would momentarily appear between upload phases
 * 3. Avatar would show "perpetual loading" state after app reload
 *
 * ROOT CAUSE:
 * Avatar upload involves multiple async phases:
 * 1. File upload to storage (useUploadAvatarMutation)
 * 2. Profile update with new avatar path (useUpdateUserProfileMutation)
 * 3. Public URL generation for new avatar (useImageUrlQuery in UserContext)
 *
 * The issue occurred because loading states weren't properly synchronized across
 * these phases, causing UI to show inconsistent states between operations.
 *
 * SOLUTION:
 * - Combine loading states: isLoading = isUploading || isUpdatingProfile
 * - This ensures spinner overlay remains visible during entire upload process
 * - Prevents flickering by maintaining consistent UI state across all async operations
 * - Avatar image stays visible with loading overlay instead of switching to placeholder
 *
 * ADDITIONAL FIXES:
 * - UserContextWrapper: Improved avatar loading logic with intelligent caching
 * - Avatar component: Better image loading state management with URL change detection
 * - Optimistic updates: Smooth transitions without UI jumps during profile updates
 */
const EditableAvatar = ({ url, size = 80 }: EditableAvatarProps) => {
  const { pickImage } = useImagePicker();

  const { mutate: uploadAvatar, isPending: isUploading } =
    useUploadAvatarMutation();

  const { mutate: updateUserProfile, isPending: isUpdatingProfile } =
    useUpdateUserProfileMutation();

  const handleAvatarPress = async () => {
    const result = await pickImage({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result) return;

    uploadAvatar(result, {
      onSuccess: (data) => {
        if (!data?.path) return;

        updateUserProfile({ avatar_url: data.path });
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleAvatarPress}
      className='relative'
      style={{ width: size, height: size }}
    >
      <Avatar
        {...{
          url,
          size,
          isLoading: isUploading || isUpdatingProfile,
        }}
      />
      <View
        className='absolute bottom-[0px] right-[5px] items-center justify-center rounded-full'
        style={{
          backgroundColor: colors.primary.white,
          width: size / 3,
          height: size / 3,
        }}
      >
        <Ionicons
          name='camera'
          size={18 * (size / 80)}
          style={{ color: colors.primary.blue['400'] }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default EditableAvatar;
