import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

type Props = {
  className?: string
  imageUrl: string
  name: string
  price: number
  active?: boolean
  onClick?: () => void
}

export const Ingredient = (props: Props) => {
  return (
    <div className={cn("flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white", { 'border border-primary': props.active }, props.className)} onClick={props.onClick}>
      {props.active && <CircleCheck className='absolute top-2 right-2 text-primary' />}
      <img width={110} src={props.imageUrl} />
      <span className='text-xs mb-1'>{props.name}</span>
      <span className='font-bold'>{props.price} ₽</span>
    </div>
  )
}