import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { AUTO_UPDATE_FEED_MC, BASE_URL, QUERY_KEYS } from '../../constants'

export const useGetNewStories = () => {
	const queryClient = useQueryClient()

	const { data: storiesIds, isRefetching } = useQuery(
		[QUERY_KEYS.PROJECTS],
		async () => {
			const { data } = await axios.get<number[]>('/newstories.json', {
				baseURL: BASE_URL,
			})

			return data.splice(0, 100)
		},
		{ staleTime: AUTO_UPDATE_FEED_MC },
	)

	const updateProjects = async () => {
		await queryClient.invalidateQueries([QUERY_KEYS.PROJECTS])
	}

	return {
		storiesIds,
		isRefetching,
		updateProjects,
	}
}
