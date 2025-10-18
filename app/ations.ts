"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { PayOrderTemplate } from "@/shared/components/shared/email-template/pay-order";
import { VerificationUserTemplate } from "@/shared/components/shared/email-template/verification-user";
import { creatPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
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
            })
        );
        return paymentData.confirmation.confirmation_url;
    } catch (error) {
        console.log("[CreateOrder] Server error", error);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error("Пользовател не найден");
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                email: body.email,
                fullName: body.fullName,
                verified: new Date(),
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
    } catch (error) {
        console.log("Error [UPDATE USER]", error);
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error("Почта не подтверждена");
            }
            throw new Error("Пользователь уже существует");
        }

        const createUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createUser.id,
            },
        });

        await sendEmail(
            createUser.email,
            "Next Pizza / Подтверждение регистрации",
            VerificationUserTemplate({
                code,
            })
        );
    } catch (error) {
        console.log("Error [CREATE_USER]", error);
        throw error;
    }
}
