'use client'
import React, { useEffect, useState } from 'react'
import { Api } from './api-client'
import { IStory } from '@/shared/services/stories'
import { Container } from './container'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

type Props = {
	className?: string
}

const Stories = ({ className }: Props) => {
	const [stories, setStories] = useState<IStory[]>([])
	const [open, setOpen] = useState(false)
	const [selectStory, setSelectStory] = useState<IStory>()

	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}
		fetchStories()
	}, [])

	const onClickStory = (story: IStory) => {
		setSelectStory(story)
		if (story.items.length > 0) {
			setOpen(true)
		}
	}

	return (<>
		<Container className={cn('flex items-center justify-between gap-2 my-10 ', className)}>
			{stories.length === 0 &&
				[...Array(6)].map((_, i) => (
					<div key={i} className='w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse' />
				))
			}
			{stories.map(story => (
				<Image
					alt='Story image'
					key={story.id}
					onClick={() => onClickStory(story)}
					className='rounded-md cursor-pointer'
					height={250}
					width={200}
					src={story.previewImageUrl}
				/>
			))}
		</Container>
	</>)

}

export default Stories