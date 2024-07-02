import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { DataQueryKey } from "../data-query-keys";
import { UserGetPostComments } from "../type";

export const useGetUserComments = (id: number) => {
  return useQuery<UserGetPostComments>({
    queryKey: [DataQueryKey.USER_COMMENT, id],
    queryFn: async () => {
      const { data } = await httpClient.get(API_URLS.getPostComment(id));
      return data;
    },
  });
};
