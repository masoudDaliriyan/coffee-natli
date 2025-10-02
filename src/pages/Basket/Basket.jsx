import React from "react";
import Header from "../Main/components/Header/Header.jsx";
import { useBasket } from "../../context/BasketContex.jsx";

export default function Basket()
{
    const {
        items: basketItems,
        updateQuantity,
        removeItem,
        basketTotal
    } = useBasket();

    const increaseQuantity = (id) =>
    {
        const item = basketItems.find(item => item.id === id);
        if (item) updateQuantity(id, item.quantity + 1);
    };

    const decreaseQuantity = (id) =>
    {
        const item = basketItems.find(item => item.id === id);
        if (item) updateQuantity(id, Math.max(item.quantity - 1, 1));
    };

    return (
        <>
            <Header />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>

                { basketItems.length === 0 ? (
                    <p className="mt-2 text-gray-600">هیچ محصولی در سبد خرید نیست</p>
                ) : (
                    <>
                        <ul>
                            { basketItems.map(item => (
                                <li key={ item.id } className="flex justify-between items-center p-2 border-b">
                                    <div className="flex items-center gap-2">
                                        <img src={ item.image } alt={ item.title } className="w-12 h-12 object-cover rounded" />
                                        <span>{ item.title }</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="bg-gray-300 px-2 py-1 rounded"
                                            onClick={ () => decreaseQuantity(item.id) }
                                        >
                                            -
                                        </button>
                                        <span>{ item.quantity }</span>
                                        <button
                                            className="bg-gray-300 px-2 py-1 rounded"
                                            onClick={ () => increaseQuantity(item.id) }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span>${ (item.price * item.quantity).toFixed(2) }</span>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={ () => removeItem(item.id) }
                                    >
                                        حذف
                                    </button>
                                </li>
                            )) }
                        </ul>
                        <p className="mt-2 font-bold">مجموع: ${ basketTotal.toFixed(2) }</p>
                    </>
                ) }
            </div>
        </>
    );
}
