import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizzz";
import { calcTotalPizzaPrice } from "./calc-total-pizza-prices";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredienrs: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredienrs
  );
  const textDetails = `${size}см, ${mapPizzaType[type]} пицца`;
  return {
    totalPrice,
    textDetails,
  };
};
