"use client";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import React from "react";
import { ProductWithRealtions } from "@/@type/prisma";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../choose-product-form";
import ChoosePizzaForm from "../choose-pizza-form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { ProductForm } from "../product-form";

type Props = {
  className?: string;
  product: ProductWithRealtions;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  // const firstItem = product.items[0];
  // const isPizzaForm = Boolean(firstItem.pizzaType);
  // const { addCartItem, loading } = useCartStore();

  // const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
  //   try {
  //     // if (isPizzaForm && productItemId && ingredients) {
  //     //   await addCartItem({
  //     //     productItemId,
  //     //     ingredients,
  //     //   });
  //     //   toast.success("add pizz to cart");
  //     //   router.back();
  //     // } else {
  //     const itemId = productItemId ?? firstItem.id;
  //     await addCartItem({
  //       productItemId: itemId,
  //       ingredients,
  //     });
  //     toast.success(`add ${product.name} to cart`);
  //     router.back();
  //     // }
  //   } catch (e) {
  //     toast.error("failed to add product to cart");
  //     console.error(e);
  //   }
  // };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        <DialogTitle>
          <ProductForm product={product} onSubmit={() => router.back()} />
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
