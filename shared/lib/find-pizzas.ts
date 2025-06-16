import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

const DEFAULT_LIMIT = 12;
const DEFAULT_PAGE = 1;

export const findPizzas = async (params: GetSearchParams) => {
    const sizes = await params.sizes?.split(",").map(Number);
    const pizzaTypes = await params.pizzaTypes?.split(",").map(Number);
    const ingredientsIdArr = await params.ingredients?.split(",").map(Number);

    const parPrMin = await params.priceFrom;
    const parPrMax = await params.priceTo;

    const minPrice = Number(parPrMin) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(parPrMax) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: "desc",
                },
                where: {
                    ingredient: ingredientsIdArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIdArr,
                                  },
                              },
                          }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
                include: {
                    ingredient: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: "asc",
                        },
                    },
                },
            },
        },
    });

    return categories;
};
