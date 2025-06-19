import { CheckoutItem } from "@/shared/components/shared/checkout-item";
import CheckoutItemDetails from "@/shared/components/shared/checkout-item-details";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
	return <Container className="mt-10">
		<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"></Title>
		<div className="flex gap-10">
			<div className="flex flex-col gap-10 flex-1 mb-20">
				<WhiteBlock title="1. Корзина">
					<div className="flex flex-col gap-5">
						<CheckoutItem imageUrl={""} name="Чорризо фреш" price={132} quantity={0} id={1} details="sdfasdfasdfasdf" />
						<CheckoutItem imageUrl={""} name="Чорризо фреш" price={132} quantity={0} id={1} details="sdfasdfasdfasdf" />
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
				<WhiteBlock className="p-6 sticky top-4">
					<div className="flex flex-col gap-1">
						<span className="text-xl">Итого:</span>
						<span className="text-[34px] font-extrabold">3400₽</span>
					</div>
					<CheckoutItemDetails title={
						<div className="flex items-center">
							<Package className="mr-2 text-gray-400" size={18} />
							Стоимость товара:
						</div>
					} value={23333} />
					<CheckoutItemDetails title={
						<div className="flex items-center">
							<Percent className="mr-2 text-gray-400" size={18} />
							Налоги:
						</div>
					} value={133} />
					<CheckoutItemDetails title={
						<div className="flex items-center">
							<Truck className="mr-2 text-gray-400" size={18} />
							Доставка:
						</div>
					} value={233} />
					<Button
						type="submit"
						className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
						Перейти к оплате
						<ArrowRight className="w-5 ml-2" />
					</Button>
				</WhiteBlock>
			</div>
		</div>
	</Container>
}