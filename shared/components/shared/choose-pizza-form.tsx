import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Title } from './title';
import { Button } from '../ui/button';
import ProductImage from './pizza-image';
import { GroupVariants } from './group-variants';
import { pizzaSize } from '@/shared/constants/pizzz';

type Props = {
  className?: string
  imageUrl: string;
  name: string;
  ingredients: any[];
  // items?: any[];
  onClickAdd?: VoidFunction;

}

const ChoosePizzaForm = ({
  name,
  // items,
  imageUrl,
  // ingredients,
  // onClickAdd,
  className,
}: Props) => {
  const textDetails = '30см, традиционное тесто 30'
  const totalPrice = 350
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] bh=[#f7f6f5] p-7" >
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400 '>{textDetails}</p>
        <GroupVariants items={pizzaSize} />
        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full'>Добавить в корзину за {totalPrice}</Button>
      </div>
    </div>
  )
}

export default ChoosePizzaForm