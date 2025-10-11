import { useEffect, useRef } from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const isMountes = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (isMountes) {
            const params = {
                ...filters.price,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngerdients),
            };

            const query = qs.stringify(params, {
                arrayFormat: "comma",
            });

            router.push(`?${query}`, {
                scroll: false,
            });
        }
        isMountes.current = true;
    }, [
        // filters,
        filters.pizzaTypes,
        filters.price,
        filters.sizes,
        filters.selectedIngerdients,
        // router,
    ]);
};
