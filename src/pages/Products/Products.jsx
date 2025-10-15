import React, {useEffect, useRef} from "react";
import Header from "../Main/components/Header/Header.jsx";
import { Link } from "react-router-dom";
import MainContainer from "../Main/components/MainContainer/MainComponent.jsx";
import Button from "../../components/Button/Button.jsx";
import { useBasket } from "../../context/BasketContex.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ChevronsDown from "../../../public/icons/ChevronsDown.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useSidebar } from "../../context/SidebarContext.jsx";
import ProductList from "./components/ProductList.jsx";

export default function ProductsList() {
    const { products, loading } = useProducts();
    const { activeItem } = useSidebar();


    const productListRef = useRef(null);

    if (loading) return <div>Loading...</div>;
    if (!products) return <div>No products found.</div>;

    const scrollToProducts = () => {
        if (productListRef.current) {
            productListRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={scrollToProducts}>
                <ChevronsDown />
            </div>
            <MainContainer>
                <div ref={productListRef}>
                    <ProductList products={products} activeItem={activeItem} />
                </div>
                <Footer />
            </MainContainer>
        </div>
    );
}
