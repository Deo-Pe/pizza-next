import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details'
import { PizzaSize, PizzaType } from '@/shared/constants/pizzz'
import { CartStateItem } from '@/shared/services/get-cart-details'

type Props = {
	items: CartStateItem[]
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
	removeCartItem: (id: number) => void
	className?: string
}

const CheckoutCart = ({ items, onClickCountButton, removeCartItem, className }: Props) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{
					items.map(item => (
						<CheckoutItem
							key={item.id}
							imageUrl={item.imageUrl}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							id={item.id}
							details={getCartItemDetails(
								item.ingredients,
								item.pizzaType as PizzaType,
								item.pizzaSize as PizzaSize,
							)}
							disabled={item.disabled}
							onClickCountButton={(type) =>
								onClickCountButton(item.id, item.quantity, type)}
							onClickRemove={() => removeCartItem(item.id)}
						/>
					))
				}
			</div>
		</WhiteBlock>
	)
}

export default CheckoutCart