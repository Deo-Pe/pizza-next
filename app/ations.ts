"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { PayOrderTemplate } from "@/shared/components/shared/email-template/pay-order";
import { creatPayment } from "@/shared/lib/create-payment";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookiesStore = cookies();
        const cartToken = (await cookiesStore).get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }
        //находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });
        //если корзина не найдена
        if (!userCart) {
            throw new Error("Cart not found");
        }

        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }
        //создаём заказ
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });
        //очищаем корзину
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        //Сделать оплату

        const paymentData = await creatPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: "Оплата заказа#" + order.id,
        });

        if (!paymentData) {
            throw new Error("Paymant data not found");
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        await sendEmail(
            data.email,
            "Next Pizza / Оплатите заказ №" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: paymentData.confirmation.confirmation_url,
            }),
        );
        return paymentData.confirmation.confirmation_url;
    } catch (error) {
        console.log("[CreateOrder] Server error", error);
    }
}
