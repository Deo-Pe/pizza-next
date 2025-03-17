import { Container } from "@/components/shared/container";
import Filters from "@/components/shared/filters";
// import ProductCard from "@/components/shared/product-card";
import ProdutsGroupList from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProdutsGroupList
                title={"Пицца"}
                products={[
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 1,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 2,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 3,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 33,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 31,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 32,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={1}
              />
              <ProdutsGroupList
                title={"Комбо"}
                products={[
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 4,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 5,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 6,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 7,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 8,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                  {
                    price: 200,
                    imageUrl:
                      "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
                    id: 9,
                    name: "Chizburger",
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
// 7.23.49
// docker run --name dbuser -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=1234 -d postgres собирает контейнер
