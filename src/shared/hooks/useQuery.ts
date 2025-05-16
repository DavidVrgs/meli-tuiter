import {
  useQuery as useTankQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useAuth } from "../contexts";
export const useQuery = <T = unknown>({
  queryKey,
  options,
  staleTime,
  skip,
  queryFn,
}: {
  queryKey: string[];
  queryFn: () => Promise<T>;
  skip?: boolean;
  staleTime?: boolean;
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
}): UseQueryResult<T> => {
  const { isAuthenticated } = useAuth();

  return useTankQuery<T>({
    queryKey,
    queryFn,
    retry: false,
    enabled: isAuthenticated && !skip,
    staleTime: staleTime ? 1000 * 60 : 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    ...options,
  });
};
