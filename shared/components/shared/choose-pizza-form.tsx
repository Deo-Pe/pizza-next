import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Title } from './title';
import { Button } from '../ui/button';
import ProductImage from './pizza-image';
import { GroupVariants } from './group-variants';
import { mapPizzaType, PizzaSize, pizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizzz';
import { Ingredient as Ingredients, ProductItem } from '@prisma/client';
import { Ingredient } from './ingredient';
import { useSet } from 'react-use';
// import { ProductWithRealtions } from '@/@type/prisma';

type Props = {
  className?: string
  imageUrl: string;
  name: string;
  ingredients: Ingredients[];
  // items: ProductWithRealtions['items'];
  items: ProductItem[];
  onClickAddCard?: VoidFunction;

}

const ChoosePizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCard,
  className,
}: Props) => {

  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)


  const [selectedIngredienrs, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0
  const totalIngredientsPrice = ingredients.filter(ingredient => selectedIngredienrs.has(ingredient.id)).reduce((acc, ingred) => acc + ingred.price, 0)

  const totalPrice = pizzaPrice + totalIngredientsPrice

  const textDetails = `${size}см, ${mapPizzaType[type]} пицца`

  const handleClickAdd = () => {
    onClickAddCard?.()
    console.log({
      size,
      ingredients,
      type
    });

  }

  const availablePizzas = items.filter(item => item.pizzaType === type)
  const availablePizzaSizes = pizzaSize.map(item => (
    {
      name: item.name,
      value: item.value,
      disabled: !availablePizzas.some(pizza => Number(pizza.size) === Number(item.value))
    }
  ))

  React.useEffect(() => {
    const isAvalableSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled)
    const availableSize = availablePizzaSizes?.find(item => !item.disabled)
    if (!isAvalableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  return (
    <div className={cn(className, 'flex flex-1 h-full')}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-[500px] bh=[#f7f6f5] p-7" >
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400 '>{textDetails}</p>
        <div className='mt-5 flex flex-col gap-4'>
          <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>
        <div className='mt=5 bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
          <div className='grid grid-cols-3 gap-3'>
            {
              ingredients.map((ingredient) => (
                <Ingredient
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  active={selectedIngredienrs.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)} />))
            }
          </div>
        </div>
        <Button onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full'>Добавить в корзину за {totalPrice}</Button>
      </div>
    </div>
  )
}

export default ChoosePizzaForm