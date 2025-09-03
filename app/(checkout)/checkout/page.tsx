"use client";
import { CheckoutItem } from "@/shared/components/shared/checkout-item";
import CheckoutItemDetails from "@/shared/components/shared/checkout-item-details";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { PizzaSize, PizzaType } from "@/shared/constants/pizzz";
import { useCart } from "@/shared/hooks/use-cart";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";


export default function CheckoutPage() {

	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};


	return <Container className="mt-10">
		<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"></Title>
		<div className="flex gap-10">
			<div className="flex flex-col gap-10 flex-1 mb-20">
				<WhiteBlock title="1. Корзина">
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
				<WhiteBlock title="2. Персональные данные">
					<div className="grid grid-cols-2 gap-5">
						<Input name="firstName" className="text-base" placeholder="Имя" />
						<Input name="lastName" className="text-base" placeholder="Фамилия" />
						<Input name="email" className="text-base" placeholder="E-Mail" />
						<Input name="phone" className="text-base" placeholder="Телефон" />
					</div>
				</WhiteBlock>
				<WhiteBlock title="3. Адресс доставки">
					<div className="flex flex-col gap-5">
						<Input name="firstName" className="text-base" placeholder="Адресс доставки" />
						<Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
					</div>
				</WhiteBlock>
			</div>
			<div className="w-[450px]">
				<CheckoutSidebar totalAmount={totalAmount} />
			</div>
		</div>
	</Container>
}