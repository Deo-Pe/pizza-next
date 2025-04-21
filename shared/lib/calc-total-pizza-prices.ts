import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizzz";
/**
 * Функция подсчёта общей стоимости
 * @param type -тип выбранной пиццы
 * @param size -размер выбранной пиццы
 * @param items -список вариаций
 * @param ingredients -список ингредиентов
 * @param selectedIngredienrs -выбранные ингредиенты
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredienrs: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredienrs.has(ingredient.id))
    .reduce((acc, ingred) => acc + ingred.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};
