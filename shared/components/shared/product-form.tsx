'use client'
import { ProductWithRealtions } from '@/@type/prisma';
import { useCartStore } from '@/shared/store/cart';
import React from 'react'
import toast from 'react-hot-toast';
import ChoosePizzaForm from './choose-pizza-form';
import ChooseProductForm from './choose-product-form';

type Props = {
	onSubmit?: VoidFunction
	product: ProductWithRealtions
}

export const ProductForm = ({ onSubmit: _onSubmit, product }: Props) => {

	const { addCartItem, loading } = useCartStore();

	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			// if (isPizzaForm && productItemId && ingredients) {
			//   await addCartItem({
			//     productItemId,
			//     ingredients,
			//   });
			//   toast.success("add pizz to cart");
			//   router.back();
			// } else {
			const itemId = productItemId ?? firstItem.id;
			await addCartItem({
				productItemId: itemId,
				ingredients,
			});
			toast.success(`add ${product.name} to cart`);
			_onSubmit?.()
			// }
		} catch (e) {
			toast.error("failed to add product to cart");
			console.error(e);
		}
	};
	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredient}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	}
	return (

		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	)
}