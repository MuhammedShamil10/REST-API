import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { DataQueryKey } from "../data-query-keys";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await httpClient.delete(API_URLS.deleteUserList(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKey.USER_LIST] });
    },
  });
};
