import React from 'react'
import { WhiteBlock } from './white-block'
import CheckoutItemDetails from './checkout-item-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/shared/lib/utils'
import { Skeleton } from '../ui/skeleton'


const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
	totalAmount: number
	loading?: boolean
	className?: string
}

export const CheckoutSidebar = ({ totalAmount, className, loading }: Props) => {

	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + VAT + DELIVERY_PRICE

	return (
		(
			<WhiteBlock className={cn("p-6 sticky top-4", className)}>
				<div className="flex flex-col gap-1">
					<span className="text-xl">Итого:</span>
					{
						loading ? <Skeleton className='w-48 h-11' /> : <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
					}

				</div>
				<CheckoutItemDetails title={
					<div className="flex items-center">
						<Package className="mr-2 text-gray-400" size={18} />
						Стоимость товара:
					</div>
				} value={loading ? <Skeleton className='w-14 h-6' /> : `${totalAmount} ₽`} />
				<CheckoutItemDetails title={
					<div className="flex items-center">
						<Percent className="mr-2 text-gray-400" size={18} />
						Налоги:
					</div>
				} value={loading ? <Skeleton className='w-14 h-6' /> : `${vatPrice} ₽`} />
				<CheckoutItemDetails title={
					<div className="flex items-center">
						<Truck className="mr-2 text-gray-400" size={18} />
						Доставка:
					</div>
				} value={loading ? <Skeleton className='w-14 h-6' /> : `${DELIVERY_PRICE} ₽`} />
				<Button
					loading={loading}
					type="submit"
					className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
					Перейти к оплате
					<ArrowRight className="w-5 ml-2" />
				</Button>
			</WhiteBlock>
		)
	)
}
