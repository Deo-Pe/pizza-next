import type { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRealtions = Product & {
  items: ProductItem[];
  ingredient: Ingredient[];
};
