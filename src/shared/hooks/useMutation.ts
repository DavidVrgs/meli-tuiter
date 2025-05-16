import {
  useMutation as useTankMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

import { useTranslation } from "../contexts";
import { useNotification } from "../contexts/notification/NotificationContext";

export const useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown
>({
  mutationFn,
  options,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;

  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;
}): UseMutationResult<TData, TError, TVariables> => {
  const { createNotification } = useNotification();
  const { t: translate } = useTranslation();

  const fallbackOnError = () => {
    createNotification({
      message: translate("error.unexpected"),
      type: "error",
    });
  };
  return useTankMutation<TData, TError, TVariables>({
    mutationFn,
    onError: options?.onError ?? fallbackOnError,
    ...options,
  });
};
