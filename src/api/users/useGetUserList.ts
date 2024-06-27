import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserList } from "../type";
import { DataQueryKey } from "../data-query-keys";
import { httpClient } from "../httpClient";
import { API_URLS } from "../endpoints";

export const useGetUserDetails = (page: number) => {
  return useQuery<UserList>({
    queryKey: [DataQueryKey.USER_LIST, page],
    queryFn: async () => {
      const { data } = await httpClient.get(API_URLS.getUserList(page));
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
