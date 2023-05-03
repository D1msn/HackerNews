import React from 'react'
import '../App.css'
import {useNavigate, useParams} from 'react-router-dom'
import {StoryDetail} from '../types'
import {CommentItem} from '../components/Comments/CommentItem'
import {Box, Button, Container, List, ListSubheader, Paper, Typography,} from '@mui/material'
import {PAGES} from '../constants'
import {getDateString, getQueryIdKey, openUrlInNewWindow} from '../utils'
import {DetailSkeleton} from '../components/DetailSkeleton'
import {useGetItemInfo} from '../hooks/api/useGetitemInfo'

//TODO Организовать написание стилей
export const DetailPage = () => {
	const navigate = useNavigate()
	const { id: idParams } = useParams()

	const id = Number(idParams)
	const queryKey = getQueryIdKey(id, 'DETAIL')

	const [storyDetail, isRefetching, updateComments] =
		useGetItemInfo<StoryDetail>({
			queryKey,
			id,
		})

	if (!storyDetail) return <DetailSkeleton />

	const url = storyDetail?.url
	const date = getDateString(storyDetail.time)

	const isShowComments = storyDetail.kids && storyDetail.descendants > 0

	return (
		<Container>
			<Box mb={3} display={'flex'} pt={2} justifyContent={'space-between'}>
				<Button onClick={() => navigate(PAGES.HOME)} variant="outlined">
					Go back
				</Button>

				{url && (
					<Button
						color={'error'}
						onClick={() => openUrlInNewWindow(url)}
						variant="outlined"
					>
						Read full
					</Button>
				)}
			</Box>

			<Paper sx={{ mb: 2 }} variant={'outlined'}>
				<Box p={2}>
					<Typography variant={'h5'}>{storyDetail.title}</Typography>

					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant={'overline'}>by {storyDetail.by}</Typography>

						{date && <Typography variant={'subtitle1'}>create at {date}</Typography>}
					</Box>
				</Box>
			</Paper>

			{isShowComments ? (
				<>
					<Box display={'flex'} justifyContent={'flex-end'} mb={1}>
						<Button
							size={'small'}
							onClick={updateComments}
							variant="outlined"
						>
							Update comments
						</Button>
					</Box>

					{!isRefetching && (
						<List
							sx={{ width: '100%', bgcolor: 'background.paper' }}
							component="ul"
							subheader={
								<ListSubheader component="h3" sx={{ fontSize: '18px' }}>
									Total comments: {storyDetail.descendants}
								</ListSubheader>
							}
						>
							{storyDetail.kids?.map((id) => (
								<CommentItem key={id} id={id} isChild={false} />
							))}
						</List>
					)}
				</>
			) : (
				<ListSubheader component="h3" sx={{ fontSize: '18px' }}>
					No comments..., be the first!
				</ListSubheader>
			)}
		</Container>
	)
}
