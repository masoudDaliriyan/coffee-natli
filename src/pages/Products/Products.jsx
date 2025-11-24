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
import {useParams} from "react-router-dom";
import {branches} from '../../../branches.json'

function getBranchTitle(key) {
    const branch = branches.find(b => b.key === key);
    return branch ? branch.name : "شعبه نامشخص"; // مقدار fallback
}


export default function ProductsList() {
    const { products, loading } = useProducts();
    const { unique_name, tableNumber } = useParams();

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
                <Header title={getBranchTitle(unique_name)} />
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
                <Header title={getBranchTitle(unique_name)} />
                <MainContainer>
                    <div className="text-center mt-8">محصولی یافت نشد</div>
                </MainContainer>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header title={getBranchTitle(unique_name)} />
            <div
                className="flex justify-center items-center mt-4 cursor-pointer"
                onClick={scrollToProducts}
            >
                <ChevronsDown />
            </div>
            <MainContainer>
                <div ref={productListRef}>
                    <ProductList products={products} activeItem={activeItem} isShow3Column={true}/>
                </div>
                <Footer />
            </MainContainer>
        </div>
    );
}
