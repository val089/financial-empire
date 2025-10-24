import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { supabase } from 'lib/supabase/supabase';
import { Alert } from 'react-native';
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { UseUploadAvatarMutationResponse } from './types';

const useUploadAvatarMutation = () =>
  useMutation({
    mutationFn: async (
      result: ImagePickerSuccessResult
    ): Promise<UseUploadAvatarMutationResponse | undefined> => {
      try {
        const image = result.assets[0];

        // if (!image.uri) {
        //   throw new Error('No image uri!'); // Realistically, this should never happen, but just in case...
        // }

        const arraybuffer = await fetch(image.uri).then((res) =>
          res.arrayBuffer()
        );

        const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
        const path = `${Date.now()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(path, arraybuffer, {
            contentType: image.mimeType ?? 'image/jpeg',
          });

        if (!data || uploadError) {
          throw uploadError;
        }

        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    },
    mutationKey: [Mutations.UploadAvatar],
  });

export default useUploadAvatarMutation;
