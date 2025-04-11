import { prisma } from '@/prisma/prisma-client'
import React from 'react'
import { ChooseProductModal } from '@/shared/components/shared/modals/choose-product-modal'
import { notFound } from 'next/navigation';

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredient: true,
      items: true,
    },
  });

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product} />
}
