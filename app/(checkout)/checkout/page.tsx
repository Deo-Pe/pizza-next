"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks/use-cart";
import CheckoutCart from "@/shared/components/shared/checkout/checkout-cart";
import CheckoutPersonalForm from "@/shared/components/shared/checkout/chekout-personal-form";
import CheckoutAddressForm from "@/shared/components/shared/checkout/checkout-address-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrder } from "@/app/ations";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Api } from "@/shared/components/shared/api-client";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
	const { data: session } = useSession()
	const [submit, setSubmit] = useState(false)
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		}
	})

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data.fullName.split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', data.email)
		}
		if (session) {
			fetchUserInfo()
		}
	}, [session])

	const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
		try {
			setSubmit(true)
			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! Переход на оплату...', {
				icon: '✅',
			})

			if (url) {
				location.href = url
			}
		} catch (error) {
			console.log(error);
			setSubmit(false)
			toast.error('Не удалось создать заказ!', {
				icon: '⛔',
			})
		}

	}

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus",
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};


	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"></Title>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart loading={loading} items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />
							<CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
							<CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
						</div>
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submit} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}

