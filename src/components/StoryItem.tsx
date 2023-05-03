import {Box, Skeleton, Typography,} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {PAGES} from '../constants'
import {StoryDetail} from '../types'
import React, {useCallback} from 'react'
import {getDateString, getQueryIdKey} from '../utils'
import {useGetItemInfo} from "../hooks/api/useGetitemInfo";

type StoryItemProps = {
	id: number
}

export const StoryItem = ({ id }: StoryItemProps) => {
	const navigate = useNavigate()

	const queryKey = getQueryIdKey(id, "STORY")

	const [storyInfo] =
		useGetItemInfo<StoryDetail>({
			queryKey,
			id,
		})

	const onClickHandler = useCallback(() => {
		navigate(`${PAGES.HOME}${id}`)
	}, [id])

	if (!storyInfo) return <Skeleton height={'50px'} />

	const date = getDateString(storyInfo.time)

	return (
		<Box
			mt={2}
			sx={{ border: '1px solid black', cursor: 'pointer' }}
			onClick={onClickHandler}
		>
			<Box p={2}>
				{date && <Typography variant={'caption'}>create at {date}</Typography>}
				<Typography sx={{ marginY: 2 }} variant={'h5'}>
					{storyInfo.title}
				</Typography>

				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant={'overline'}>by {storyInfo.by}</Typography>
					<Box display={'flex'}>
						<Box mr={1} display={'flex'} alignItems={'center'} gap={1}>
							<svg width={30} height={30} viewBox="0 0 24 24">
								<path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
							</svg>
							<Typography variant={'h6'}>{storyInfo.descendants}</Typography>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<svg width={30} height={30} viewBox="0 0 24 24">
								<path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
							</svg>
							<Typography variant={'h6'}>{storyInfo.score}</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
