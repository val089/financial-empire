import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from '../../enums';
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

      const avatar_url = URL.createObjectURL(data);
      return {
        avatar_url,
      };
    },
    ...options,
  });

export default useDownloadImageQuery;
