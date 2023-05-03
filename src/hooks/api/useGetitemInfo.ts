import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback } from 'react'
import { BASE_URL } from '../../constants'

type UseGetItemInfoProps = {
	id: number
	queryKey: QueryKey
	enabled?: boolean
}

export const useGetItemInfo = <T>({
	queryKey,
	id,
	enabled = true,
}: UseGetItemInfoProps) => {
	const queryClient = useQueryClient()

	const { data, isRefetching } = useQuery(
		queryKey,
		async () => {
			const { data } = await axios.get<T>(`/item/${id}.json`, {
				baseURL: BASE_URL,
			})
			return data
		},
		{ enabled },
	)

	const update = useCallback(async () => {
		await queryClient.invalidateQueries(queryKey)
	}, [queryKey])

	return [data, isRefetching, update] as const
}
