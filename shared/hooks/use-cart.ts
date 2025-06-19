import React from "react";
import { useCartStore } from "../store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../services/get-cart-details";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
    // const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
    //   state.totalAmount,
    //   state.fetchCartItems,
    //   state.items,
    // ]);
    const { addCartItem, totalAmount, fetchCartItems, removeCartItem, updateItemQuantity, items, loading } = useCartStore();
    React.useEffect(() => {
        fetchCartItems();
    }, []);

    return { addCartItem, totalAmount, removeCartItem, updateItemQuantity, items, loading };
};
