import { Container } from "@/shared/components/shared/container";
import Filters from "@/shared/components/shared/filters";
import ProdutsGroupList from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/title";
import TopBar from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import Stories from "@/shared/components/shared/stories";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const params = await searchParams;

  const categories = await findPizzas(params);
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
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
// 22.01.23
// docker run --name dbuser -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=1234 -d postgres собирает контейнер
//re_7gwueaQE_61Q1eRTZuci1as1hGrdt7Z9S
//user@test.ru UserqQ 222222 

// https://console.cloud.google.com/apis/dashboard
// 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 - clientSecret
// 5355736879-iik6aichbtrjd1o2v64uqj9amoaoouat.apps.googleusercontent.com -- client ID