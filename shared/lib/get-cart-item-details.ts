import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizzz";

export const getCartItemDetails = (
  pizzaTypes: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
): string => {
  const details = [];

  if (pizzaSize && pizzaTypes) {
    const typeName = mapPizzaType[pizzaTypes];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }
  return details.join(", ");
};
