import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { QueryObserverResult } from '@tanstack/react-query';

const useRefreshOnScroll = ({
  refetch,
}: {
  refetch: () => Promise<QueryObserverResult>;
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return { refreshing, refreshControl };
};

export default useRefreshOnScroll;
