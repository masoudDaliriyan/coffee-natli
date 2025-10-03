import React, { useEffect } from "react";
import Header from "../Main/components/Header/Header.jsx";
import Product from "./components/Product.jsx";
import { Link } from "react-router-dom";
import MainContainer from "../Main/components/MainContainer/MainComponent.jsx";
import Button from "../../components/Button/Button.jsx";
import { getUsers } from "../../api/api.js";
import { useBasket } from "../../context/BasketContex.jsx";

export default function ProductsList() {
    const { itemCount ,basketTotal} = useBasket();

    useEffect(() => {
        getUsers().then(r => console.log('hello'));
    }, []);

    const products = [
        {
            id: 1,
            title: "باقلوا",
            price: 12.99,
            image: "/products/1.jpg",
            description: "باقلوا یک شیرینی سنتی خوشمزه و مقوی است که از لایه‌های نازک خمیر و مغزهای آسیاب‌شده مثل گردو و بادام ساخته می‌شود. شیرینی با شهد شیرین پوشانده شده و هر لقمه آن طعم بی‌نظیری دارد. مناسب برای سرو همراه چای یا به عنوان هدیه."
        },
        {
            id: 2,
            title: "کیک یزدی",
            price: 7.49,
            image: "/products/2.jpg",
            description: "کیک یزدی یک کیک کوچک و نرم است که با طعم وانیل و کره تهیه می‌شود. بافت آن سبک و لطیف است و شیرینی ملایم آن آن را به میان‌وعده‌ای ایده‌آل برای هر زمان روز تبدیل می‌کند."
        },
        {
            id: 3,
            title: "شیرینی دانمارکی",
            price: 39.99,
            image: "/products/3.jpg",
            description: "شیرینی دانمارکی یک شیرینی لایه‌ای کرم‌دار است که با کره و شکر درست می‌شود. بافت نرم و کرمی داخل و لایه‌های ترد بیرونی آن، تجربه‌ای لذت‌بخش از طعم شیرینی اروپایی را ارائه می‌دهد. مناسب برای صبحانه یا عصرانه."
        },
        {
            id: 4,
            title: "شیرینی دانمارکی",
            price: 39.99,
            image: "/products/10.jpg",
            description: "شیرینی دانمارکی یک شیرینی لایه‌ای کرم‌دار است که با کره و شکر درست می‌شود. بافت نرم و کرمی داخل و لایه‌های ترد بیرونی آن، تجربه‌ای لذت‌بخش از طعم شیرینی اروپایی را ارائه می‌دهد. مناسب برای صبحانه یا عصرانه."
        },
    ];

    return (
        <div>
            <Header />
            <MainContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Product key={product.id} data={product} />
                    ))}
                </div>
                {itemCount > 0 && (
                    <>
                        <div className="h-12"></div>
                        <Link to="/basket">
                            <Button
                                className="fixed bottom-0 left-0 right-0 w-[80%] mx-auto h-15 flex items-center justify-center font-bold"
                            >
                                سبد خرید
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-4 py-2.5"
                                >
                                    {itemCount}
                                </span>
                            </Button>
                        </Link>
                    </>
                )}
            </MainContainer>
        </div>
    );
}
