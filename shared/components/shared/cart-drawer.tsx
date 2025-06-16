"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CartDrawerItem from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizzz";
import Image from "next/image";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
};

const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  // const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
  //   state.totalAmount,
  //   state.fetchCartItems,
  //   state.items,
  // ]);
  const {
    totalAmount,
    fetchCartItems,
    removeCartItem,
    updateItemQuantity,
    items,
  } = useCartStore();

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && "justify-center")}>
          {
            totalAmount > 0 && <SheetHeader>
              <SheetTitle>
                В корзине <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          }

          {
            !totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image src="/assets/images/empty-box.png" alt="empty-card" width={120} height={120} />
                <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
                <SheetClose>
                  <Button className="w-56 h-12 text-base " size="lg">
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуть назад
                  </Button>
                </SheetClose>
              </div>
            )
          }

          {totalAmount > 0 && (<>
            <div className="-mx-6 mt-5 scrollbar overflow-auto flex-1">
              {items.map((item) => (
                <div className="mb-2" key={item.id}>
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    details={
                      item.pizzaSize && item.pizzaType
                        ? getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )
                        : ""
                    }
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                </div>
              ))}
            </div>
            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>
                <Link href="/cart">
                  <Button type="submit" className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>)}
        </div>
      </SheetContent>
    </Sheet >
  );
};

export default CartDrawer;
