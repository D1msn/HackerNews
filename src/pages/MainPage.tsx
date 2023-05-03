import React from 'react'
import '../App.css'
import { Box, Button, Container } from '@mui/material'
import { StoryItem } from '../components/StoryItem'
import { LoaderFullScreen } from '../components/LoaderFullScreen'
import { useGetNewStories } from '../hooks/api/useGetNewStories'

//TODO Организовать написание стилей
export const MainPage = () => {
	const { storiesIds, isRefetching, updateProjects } = useGetNewStories()

	if (!storiesIds) return <LoaderFullScreen />

	return (
		<Container
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box mt={2} display={'flex'} justifyContent={'flex-end'}>
				<Button onClick={updateProjects} variant={'outlined'}>
					update
				</Button>
			</Box>
			{isRefetching && <LoaderFullScreen />}
			{!isRefetching && storiesIds.map((id) => <StoryItem key={id} id={id} />)}
		</Container>
	)
}
