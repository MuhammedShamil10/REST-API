import { useQuery } from "@tanstack/react-query"
import { SingleUser } from "../type"
import { DataQueryKey } from "../data-query-keys"
import { httpClient } from "../httpClient"
import { API_URLS } from "../endpoints"

export const useGetSingleUserDetails = (id: number) => {
    return useQuery<SingleUser>({
        queryKey: [DataQueryKey.USER],
        queryFn: async () => {
            const { data } = await httpClient.get(API_URLS.getUser(id))
            return data
        }
    })
}