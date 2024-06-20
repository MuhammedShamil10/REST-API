import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { DataQueryKey } from "../data-query-keys";

type userList = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, email, status, gender }: userList) => {
      const data = await httpClient.patch(API_URLS.updateUserList(id), {
        name: name,
        email: email,
        status: status,
        gender: gender,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKey.USER_LIST] });
    },
  });
};
