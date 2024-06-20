import { useQuery } from "@tanstack/react-query"
import { UserList } from "../type"
import { DataQueryKey } from "../data-query-keys"
import { httpClient } from "../httpClient"
import { API_URLS } from "../endpoints"

export const useGetUserDetails = () => {
    return useQuery<UserList>({
        queryKey: [DataQueryKey.USER_LIST],
        queryFn: async () => {
            const { data } = await httpClient.get(API_URLS.getUserList())
            return data
        }
    })
}