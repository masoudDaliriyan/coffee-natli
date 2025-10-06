import React, { createContext, useContext, useState, useEffect } from "react";
import {getProducts} from "../api/api.js";

// 1. Create the context
const ProductContext = createContext();

// 2. Context provider component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data.data.data);
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
