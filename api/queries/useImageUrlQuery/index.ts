import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from 'api/enums';
import { UseImageUrlQueryOptions, UseImageUrlReturnType } from './types';

const useImageUrlQuery = ({
  storageName,
  path,
  options,
}: {
  options?: UseImageUrlQueryOptions;
  storageName: string;
  path: string;
}): UseImageUrlReturnType =>
  useQuery({
    queryKey: [Queries.ImageUrl, storageName, path],
    queryFn: async () => {
      const { data } = supabase.storage.from(storageName).getPublicUrl(path);

      if (!data?.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      return data.publicUrl;
    },
    ...options,
  });

export default useImageUrlQuery;
