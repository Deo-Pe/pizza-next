import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";
import ProductImage from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizzz";
import { Ingredient as Ingredients, ProductItem } from "@prisma/client";
import { Ingredient } from "./ingredient";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredients[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
};

const ChoosePizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  onSubmit,
  loading,
  className,
}: Props) => {
  const {
    size,
    type,
    selectedIngredients,
    setSize,
    setType,
    availableSizes,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);
  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) onSubmit(currentItemId, Array.from(selectedIngredients));
  };
  return (
    <div className={cn(className, "flex flex-1 h-full")}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-[500px] bh=[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 ">{textDetails}</p>
        <div className="mt-5 flex flex-col gap-4">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="mt=5 bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
