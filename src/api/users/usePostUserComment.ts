import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { PostUserComment } from "../../type";
import { DataQueryKey } from "../data-query-keys";

export const usePostUserComments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PostUserComment) => {
      const param = {
        name: payload.name,
        email: payload.email,
        body: payload.body,
      }
      const data = await httpClient.post(
        API_URLS.createPostComment(payload.id),
        param
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKey.USER_COMMENT] });
    },
  });
};
