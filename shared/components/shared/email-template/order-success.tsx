import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface Props {
	orderId: number;
	items: CartItemDTO[]
}

export function OrderSuccessTemplate({ orderId, items }: Props) {
	return (
		<div>
			<h1>Спасибо за покупку!</h1>
			<p>Ваш заказ #${orderId} оплачен. Спасибо за покупку.</p>
			<hr />
			<ul>
				{
					items.map(item => (
						<li key={item.id}>
							{item.productItem.product.name} | {item.productItem.price} P x {item.quantity} шт. ={' '}
							{item.productItem.price * item.quantity} P
						</li>
					))
				}
			</ul>
		</div>
	);
}