import { Container } from "@/shared/components/shared/container";
import Filters from "@/shared/components/shared/filters";
import ProdutsGroupList from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/title";
import TopBar from "@/shared/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredient: true,
          items: true
        }
      }
    }
  })
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(category => (
                <ProdutsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  products={category.products}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
// 9.14.00
// docker run --name dbuser -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=1234 -d postgres собирает контейнер
