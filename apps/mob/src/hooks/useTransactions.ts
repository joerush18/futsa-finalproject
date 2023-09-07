import { useGetTransactionByUser } from "core";
import useCurrentUser from "./useCurrentUser";
import useRefetch from "./useRefetch";

const useTransactions = () => {
  const { user } = useCurrentUser();
  const { data, isLoading, refetch } = useGetTransactionByUser(user?.id ?? "");
  const { refreshing, onRefresh } = useRefetch(refetch);

  return {
    payments: data,
    isFetching: isLoading,
    onRefresh,
    refreshing,
  };
};

export default useTransactions;
