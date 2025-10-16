import React, { useRef, useEffect } from "react";
import Product from "./Product.jsx";
import Divider from "../../../components/Divider/Divider.jsx";
import {useBasket} from "../../../context/BasketContex.jsx";

export default function ProductList({ products, activeItem }) {
    const categoryRefs = useRef({});
    const {} = useBasket()

    const scrollToCategory = (cat_id) => {
        const element = categoryRefs.current[cat_id];
        if (element) {
            const offset = 10;
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (activeItem) scrollToCategory(activeItem);
    }, [activeItem,products]);

    return (
        <>
            {products.cats.map((cat) => (
                <div
                    key={cat.cat_id}
                    ref={(el) => (categoryRefs.current[cat.cat_id] = el)}
                    className="mb-6"
                >
                    <Divider>{cat.cat_title}</Divider>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {products.prods
                            .filter((p) => p.cat_id === cat.cat_id)
                            .map((product) => (
                                <Product key={product.id} data={product} />
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
}
