import { useState, useCallback } from "react";

const useRefetch = (refetch: () => void) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
      setRefreshing(false);
    }, 2000);
  }, []);
  return {
    onRefresh,
    refreshing,
  };
};

export default useRefetch;
