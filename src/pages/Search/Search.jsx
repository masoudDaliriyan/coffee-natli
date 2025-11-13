import React, { useState, useMemo } from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import ProductList from "../Products/components/ProductList.jsx";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";
import Button from "../../components/Button/Button.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";
import {useAuth} from "../../context/AuthContext.jsx";

export default function SearchProducts() {
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const rootNavigate = useRootNavigate();
    const { isAuthenticated } = useAuth();



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

    const header = (
        <div className="mb-4 flex justify-center">
            <input
                type="text"
                placeholder="جستجو محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring mx-4"
            />
        </div>
    )

    const handelOnclickBasket = () =>
    {
        if (isAuthenticated)
        {
            rootNavigate("basket");
        } else
        {
            rootNavigate("login?from=/basket");
        }
    };

    const footer = (
            <Button
                onClick={handelOnclickBasket}
                disabled={loading}
                className="w-full py-3 flex justify-center gap-2 items-center"
                variant="success"
            >
                {loading ? "در حال پردازش..." : (
                    <>
                        <span>سبد خرید</span>
                    </>
                )}
            </Button>
        )

    return (
        <ModalRoute header={header} footer={footer} >
             <ProductList products={filteredProducts}/>
        </ModalRoute>
    );
}
