'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import React from 'react'
import { ProductWithRealtions } from '@/@type/prisma'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import ChooseProductForm from '../choose-product-form'
import ChoosePizzaForm from '../choose-pizza-form'

type Props = {
  className?: string;
  product: ProductWithRealtions;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        {
          isPizzaForm ? <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} /> :
            <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        }
      </DialogContent>
    </Dialog>
  )
}