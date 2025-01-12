import { Alert } from 'react-native';
import {
  launchImageLibraryAsync,
  ImagePickerOptions,
  requestCameraPermissionsAsync,
  PermissionStatus,
  launchCameraAsync,
} from 'expo-image-picker';
import { UseImagePickerReturnType } from './types';

const useImagePicker = (): UseImagePickerReturnType => {
  const verifyPermissions = async () => {
    const { status } = await requestCameraPermissionsAsync();
    return status;
  };

  const pickImage = async (options: ImagePickerOptions) => {
    const result = await launchImageLibraryAsync(options);

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    return result;
  };

  const takePhoto = async (options: ImagePickerOptions) => {
    try {
      const status = await verifyPermissions();

      if (status === PermissionStatus.DENIED) {
        Alert.alert(
          'Camera permission denied',
          'You need to grant camera permissions to use this app.'
        );
        return;
      }

      const result = await launchCameraAsync(options);

      if (result.canceled || !result.assets || result.assets.length === 0) {
        Alert.alert('User cancelled image picker.');
        return;
      }

      return result;
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
  };

  return { pickImage, takePhoto, verifyPermissions };
};

export default useImagePicker;
