import React, { createContext, useContext, useState, useEffect } from "react";
import {getProducts} from "../services/api.js";

// 1. Create the context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts, loading}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
