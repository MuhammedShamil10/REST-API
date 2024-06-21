import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { EditUserList } from "../../type";
import { DataQueryKey } from "../data-query-keys";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EditUserList) => {
      const param = {
        name: payload.name,
        email: payload.email,
        gender: payload.gender,
        status: payload.status,
      };
      const data = await httpClient.post(API_URLS.postUserList(), param);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKey.USER_LIST] });
    },
  });
};
