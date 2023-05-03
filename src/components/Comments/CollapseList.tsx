import {Collapse, Divider, List} from '@mui/material'
import React from 'react'
import { CommentItem } from './CommentItem'

type CollapseListProps = {
	isOpen: boolean
	isChild: boolean
	kids: number[]
}

export const CollapseList = ({ isOpen, kids, isChild }: CollapseListProps) => (
	<Collapse
		in={isOpen}
		timeout="auto"
		unmountOnExit
		sx={{ ml: '5%', borderLeft: `1px solid #0000ee` }}
	>
		<List component="div" disablePadding>
			{kids.map((id) => (
				<CommentItem key={id} id={id} isChild={isChild} />
			))}
		</List>

		<Divider />
	</Collapse>
)
