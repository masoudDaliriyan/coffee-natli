import React, { useRef } from "react";
import Header from "../Main/components/Header/Header.jsx";
import MainContainer from "../Main/components/MainContainer/MainComponent.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ChevronsDown from "../../../public/icons/ChevronsDown.jsx";
import ProductList from "./components/ProductList.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useSidebar } from "../../context/SidebarContext.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import ProductListSkeleton from "./components/ProductLoadingSkeleton.jsx";


export default function ProductsList() {
    const { products, loading } = useProducts();
    const { activeItem } = useSidebar();
    const productListRef = useRef(null);

    const scrollToProducts = () => {
        if (productListRef.current) {
            productListRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    if (loading) {
        return (
            <div>
                <Header />
                <MainContainer>
                    <ProductListSkeleton />
                </MainContainer>
                <Footer />
            </div>
        );
    }

    if (!products) {
        return (
            <div>
                <Header />
                <MainContainer>
                    <div className="text-center mt-8">No products found.</div>
                </MainContainer>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div
                className="flex justify-center items-center mt-4 cursor-pointer"
                onClick={scrollToProducts}
            >
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
