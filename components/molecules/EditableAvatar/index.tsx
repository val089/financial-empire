import { Avatar } from 'components/atoms';
import { TouchableOpacity, View } from 'react-native';
import { EditableAvatarProps } from './types';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';
import useImagePicker from 'hooks/useImagePicker';
import useUploadAvatarMutation from 'api/mutations/useUploadAvatarMutation';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';

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
      aspect: [1, 1],
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
