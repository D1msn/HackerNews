import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import React, { useCallback } from 'react'
import { SANITIZER_CONFIG } from '../../constants'
import Dompurify from 'dompurify'
import { StoryComment } from '../../types'
import { getFullNameStringAcronym } from '../../utils/string'
import { CollapseList } from './CollapseList'
import { CommentSkeleton } from './CommentSkeleton'
import { useGetItemInfo } from '../../hooks/api/useGetitemInfo'
import { getQueryIdKey } from '../../utils'

type CommentItemProps = {
	id: number
	isChild: boolean
}

export const CommentItem = ({ id, isChild }: CommentItemProps) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const avatarSize = isChild ? 24 : 32
	const queryKey = getQueryIdKey(id, 'COMMENT')

	const [comment] = useGetItemInfo<StoryComment>({
		queryKey,
		id,
		enabled: !!id,
	})

	const clickHandler = useCallback(() => setIsOpen((p) => !p), [])

	if (!comment) return <CommentSkeleton avatarSize={avatarSize} />

	if (comment.dead) return null

	const isHaveKids = !!comment.kids?.length

	return (
		<>
			<ListItem
				alignItems={'flex-start'}
				//Необходимо поведение смены компонента (deprecated)
				button={isHaveKids as true}
				selected={isHaveKids ? isOpen : undefined}
				onClick={isHaveKids ? clickHandler : undefined}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						sx={{
							width: avatarSize,
							height: avatarSize,
							fontSize: isChild ? 12 : 14,
						}}
						alt={comment?.by}
					>
						{getFullNameStringAcronym(comment?.by)}
					</Avatar>
				</ListItemAvatar>
				<Box flexGrow={1}>
					<ListItemText
						primary={comment?.by || 'Deleted...'}
						secondary={
							<Typography
								dangerouslySetInnerHTML={{
									__html: Dompurify.sanitize(
										comment?.text || '',
										SANITIZER_CONFIG,
									),
								}}
								sx={{ display: 'inline', fontSize: '12px' }}
								component="span"
								color="text.primary"
							/>
						}
					/>
					{comment?.kids?.length && (
						<ListItemText
							sx={{
								marginLeft: 'auto',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							Answer: {comment.kids.length}
						</ListItemText>
					)}
				</Box>
			</ListItem>
			{comment.kids && (
				<CollapseList isChild kids={comment.kids} isOpen={isOpen} />
			)}
		</>
	)
}
