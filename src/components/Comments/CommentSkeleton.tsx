import { ListItem, Skeleton } from '@mui/material'
import React from 'react'

type CommentSkeletonProps = {
	avatarSize?: number
}

export const CommentSkeleton = ({ avatarSize = 32 }: CommentSkeletonProps) => {
	return (
		<ListItem alignItems={'flex-start'} sx={{ gap: 1 }}>
			<Skeleton variant="circular" width={avatarSize} height={avatarSize} />
			<Skeleton variant="rounded" width={'100%'} height={75} />
		</ListItem>
	)
}
