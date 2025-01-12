import { UseUploadAvatarMutationResponse } from 'api/mutations/useUploadAvatarMutation/types';

export type AvatarPickerProps = {
  avatarUrl: string | undefined;
  onUpload?: (data: UseUploadAvatarMutationResponse | undefined) => void;
};
