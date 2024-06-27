import { useQuery } from "@tanstack/react-query";
import { DataQueryKey } from "../data-query-keys";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";
import { UserPosts } from "../type";

export const useGetUserPost = () => {
  return useQuery<UserPosts>({
    queryKey: [DataQueryKey.USER_POST],
    queryFn: async () => {
      const { data } = await httpClient.get(API_URLS.getUserPost());
      return data;
    },
  });
};
