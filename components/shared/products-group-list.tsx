"use client"
import React, { useEffect, useRef } from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import ProductCard from './product-card'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'

type Props = {
  title: string
  products: any[]
  className?: string
  listClassName?: string
  categoryId: number
}

const ProdutsGroupList = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}: Props) => {

  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = useRef(null!)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    // rootMargin: "0px",
    threshold: 0.4,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting])

  return (
    <div className={className} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div ref={intersectionRef} className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products
          .filter((product) => product.items.length > 0)
          .map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
            />
          ))}
      </div>
    </div>
  )
}

export default ProdutsGroupList
