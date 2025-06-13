import { Container } from "@/shared/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import React from "react";
import { ProductForm } from "@/shared/components/shared/product-form";

// https://nextjs.org/docs/app/guides/upgrading/version-15#asynchronous-page

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id
  const product = await prisma.product.findFirst({
    where: { id: Number(id) }, include: {
      ingredient: true,
      category: {
        include: {
          products: {
            include: {
              items: true
            }
          }
        }
      },
      items: true
    }
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="fles flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
