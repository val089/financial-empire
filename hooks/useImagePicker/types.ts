import {
  PermissionStatus,
  ImagePickerOptions,
  ImagePickerSuccessResult,
} from 'expo-image-picker';

export type UseImagePickerReturnType = {
  verifyPermissions: () => Promise<PermissionStatus>;
  pickImage: (
    options: ImagePickerOptions
  ) => Promise<ImagePickerSuccessResult | undefined>;
  takePhoto: (
    options: ImagePickerOptions
  ) => Promise<ImagePickerSuccessResult | undefined>;
};
