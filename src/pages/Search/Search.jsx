import React, { useState, useMemo } from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import ProductList from "../Products/components/ProductList.jsx";

export default function SearchProducts() {
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = useMemo(() => {
        if (!products) return { prods: [], cats: [] };

        if (!searchTerm) return products;

        const term = searchTerm.toLowerCase();
        const filteredCats = [];

        const filteredProds = (products.prods || []).filter(a =>
            a.title?.toLowerCase().includes(term)
        );

        filteredProds.forEach(prod => {
            const productCat = products.cats.find(cat => cat.cat_id === prod.cat_id);
            if (productCat && !filteredCats.some(cat => cat.cat_id === productCat.cat_id)) {
                filteredCats.push(productCat);
            }
        });


        return { prods: filteredProds, cats: filteredCats }; // Fixed here
    }, [products, searchTerm]);


    if (loading) return <div>Loading...</div>;

    if (!products) return <div>موردی یافت نشد</div>;


    return (
        <div>
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="جستجو محصولات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring mx-4"
                />
            </div>

            {products && <ProductList
                products={filteredProducts}
            />}
        </div>
    );
}
