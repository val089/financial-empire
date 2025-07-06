import { useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import { QueryObserverResult } from '@tanstack/react-query';

const useRefreshOnScroll = ({
  refetch,
}: {
  refetch: () => Promise<QueryObserverResult>;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    timeoutRef.current = setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    []
  );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return { refreshControl };
};

export default useRefreshOnScroll;
