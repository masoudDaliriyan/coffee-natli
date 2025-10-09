import React from "react";
import Header from "../Main/components/Header/Header.jsx";
import { useBasket } from "../../context/BasketContex.jsx";
import Counter from "../../components/Counter/Counter.jsx";

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
        console.log(item)
    };

    const decreaseQuantity = (id) =>
    {
        const item = basketItems.find(item => item.id === id);
        if (item) updateQuantity(id, Math.max(item.quantity - 1, 1));
    };
    const onChangeCounter = (id,value)=>{
        updateQuantity(id,value)
    }

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>

                { basketItems.length === 0 ? (
                    <p className="mt-2 text-gray-600">هیچ محصولی در سبد خرید نیست</p>
                ) : (
                    <>
                        <div>
                            {basketItems.map(item => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-3 p-3 mb-3 border border-gray-200 rounded-lg bg-white shadow-sm"
                                >
                                    {/* Top section: image + info */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://www.natli.ir/upload/prod/md/${item.image}.jpg`}
                                            alt={item.title}
                                            className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                                        />
                                        <div className="flex flex-col flex-1 text-right">
                                            <div className="text-base font-semibold">{item.title}</div>
                                            <div className="text-gray-600 text-sm mt-1">
                                                ${ (item.price * item.quantity).toFixed(2) }
                                            </div>
                                            <div className="mt-2">
                                                <Counter
                                                    id={item.id}
                                                    quantity={item.quantity}
                                                    onChange={(id, newQty) => updateQuantity(id, newQty)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-2 font-bold">مجموع: ${ basketTotal.toFixed(2) }</p>
                    </>
                ) }
            </div>
        </>
    );
}
