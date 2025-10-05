import React, { useEffect, useRef } from "react";
import Header from "../Main/components/Header/Header.jsx";
import Product from "./components/Product.jsx";
import { Link } from "react-router-dom";
import MainContainer from "../Main/components/MainContainer/MainComponent.jsx";
import Button from "../../components/Button/Button.jsx";
import { useBasket } from "../../context/BasketContex.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Divider from "../../components/Divider/Divider.jsx";
import ChevronsDown from "../../../public/icons/ChevronsDown.jsx";
import { useProducts } from "../../context/ProductContext.jsx";
import { useSidebar } from "../../context/SidebarContext.jsx";

export default function ProductsList() {
    const { products, loading } = useProducts();
    const { itemCount } = useBasket();
    const { activeItem } = useSidebar();

    const categoryRefs = useRef({});

    // Scroll to a category by cat_id
    const scrollToCategory = (cat_id) => {
        const element = categoryRefs.current[cat_id];
        if (element) {
            const offset = 10;
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    // Scroll when activeItem changes
    useEffect(() => {
        if (activeItem) {
            scrollToCategory(activeItem);
        }
    }, [activeItem]);

    // Optional: Scroll to first category on load if no activeItem
    useEffect(() => {
        const firstCatId = products?.cats?.[0]?.cat_id;
        if (!activeItem && firstCatId) {
            scrollToCategory(firstCatId);
        }
    }, [products, activeItem]);

    if (loading) return <div>Loading...</div>;
    if (!products) return <div>No products found.</div>;

    return (
        <div>
            <Header />

            {/* Scroll to first category */}
            <div className="flex justify-center items-center mt-4">
                <div onClick={() => scrollToCategory(products.cats[0].cat_id)}>
                    <ChevronsDown />
                </div>
            </div>

            <MainContainer>
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

                {itemCount > 0 && (
                    <>
                        <div className="h-12"></div>
                        <Link to="/basket">
                            <Button className="fixed bottom-0 left-0 right-0 w-[80%] mx-auto h-15 flex items-center justify-center font-bold">
                                سبد خرید
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-4 py-2.5">
                  {itemCount}
                </span>
                            </Button>
                        </Link>
                    </>
                )}

                <Footer />
            </MainContainer>
        </div>
    );
}
