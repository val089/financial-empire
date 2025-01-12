import { Avatar } from 'components/atoms';
import { TouchableOpacity } from 'react-native';
import useImagePicker from 'hooks/useImagePicker';
import useUploadAvatarMutation from 'api/mutations/useUploadAvatarMutation';
import useDownloadImageQuery from 'api/queries/useDownloadImageQuery';
import { useState } from 'react';
import { AvatarPickerProps } from './types';
import { testIDs } from 'utils/testIDs';

const AvatarPicker = ({ avatarUrl, onUpload }: AvatarPickerProps) => {
  const [url, setUrl] = useState(avatarUrl);

  const { pickImage } = useImagePicker();

  const { mutate: uploadAvatar, isPending: isUploading } =
    useUploadAvatarMutation();

  const { data: image, isLoading } = useDownloadImageQuery({
    storageName: 'avatars',
    path: url || '',
  });

  return (
    <TouchableOpacity
      disabled={isLoading || isUploading}
      onPress={async () => {
        const result = await pickImage({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result) return;

        uploadAvatar(result, {
          onSuccess: (data) => {
            setUrl(data?.path);
            onUpload?.(data);
          },
        });
      }}
      testID={testIDs.avatarPicker}
    >
      <Avatar url={image?.avatar_url} isLoading={isLoading || isUploading} />
    </TouchableOpacity>
  );
};

export default AvatarPicker;
