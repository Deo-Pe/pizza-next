import { Container } from '@/shared/components/shared/container'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import React from 'react'
import ProductImage from '@/shared/components/shared/pizza-image'
import { Title } from '@/shared/components/shared/title'
import { GroupVariants } from '@/shared/components/shared/group-variants'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return <Container className='fles flex-col my-10'>
    <div className='flex flex-1'>
      <ProductImage imageUrl={product.imageUrl} size={30} />
      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={product.name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, vero distinctio.</p>
        <GroupVariants
          selectedValue='3'
          items={[
            {
              name: "Маленькая",
              value: '1'
            },
            {
              name: "Средняя",
              value: '2',
              disabled: true
            },
            {
              name: "Большая",
              value: '3'
            }
          ]}
        />
      </div>
    </div>
  </Container>
}
