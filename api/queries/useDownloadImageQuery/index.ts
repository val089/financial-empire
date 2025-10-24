import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase/supabase';
import { Queries } from 'api/enums';
import { UseUserProfileQueryOptions } from './types';

const useDownloadImageQuery = ({
  storageName,
  path,
  options,
}: {
  options?: UseUserProfileQueryOptions;
  storageName: string;
  path: string;
}) =>
  useQuery({
    queryKey: [Queries.DownloadImage, storageName, path],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from(storageName)
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      const avatar_url: string = await new Promise((resolve, reject) => {
        fr.onload = () => {
          resolve(fr.result as string);
        };
        fr.onerror = () => {
          reject(new Error('Failed to read file as data URL'));
        };
        fr.readAsDataURL(data);
      });

      return {
        avatar_url,
      };
    },
    ...options,
  });

export default useDownloadImageQuery;
