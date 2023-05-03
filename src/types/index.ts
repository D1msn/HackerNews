export type StoryDetail = {
	by: string
	descendants: number
	id: number
	score: number
	time: number
	title: string
	type: 'story'
	url: string
	kids?: number[]
}

export type StoryComment = {
	by: string
	id: number
	parent: number
	text: string
	time: number
	deleted: boolean
	type: 'comment'
	dead?: boolean
	kids?: number[]
}
