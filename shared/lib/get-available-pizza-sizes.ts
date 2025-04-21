import { ProductItem } from "@prisma/client";
import { pizzaSize, PizzaType } from "../constants/pizzz";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  return pizzaSize.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
