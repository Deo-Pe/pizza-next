import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizzz";
import { CartStateItem } from "../services/get-cart-details";

export const getCartItemDetails = (ingredients: CartStateItem["ingredients"], pizzaTypes?: PizzaType, pizzaSize?: PizzaSize): string => {
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
