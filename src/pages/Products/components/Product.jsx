import React, {useEffect, useMemo, useState} from "react";
import Button from "../../../components/Button/Button.jsx";
import Counter from "../../../components/Counter/Counter.jsx";
import {useBasket} from "../../../context/BasketContex.jsx";

export default function Product({ data }) {
    const { items, getItem, addItem, removeItem, updateQuantity, isItemExist } = useBasket();

    const basketItem = getItem(data.id)



    const handleAddToBasket = () => {
        addItem({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.thumbnail,
        });
    };

    const handleRemoveFromBasket = () => {
        removeItem(data.id);
    };

    return (
        <div className="p-4 shadow-sm hover:shadow-md transition w-full flex rounded-lg">
            <div className="w-1/2 flex flex-col justify-between pr-4">
                <div>
                    <h2 className="mt-2 font-semibold text-lg">{data.title}</h2>
                    <p className="text-gray-700">ریال {data.price}</p>
                    <div>{data.discount}%</div>
                </div>

                <div className="flex">
                    {!isItemExist(data.id) ? (
                        <Button
                            className="max-w-[90px] text-center ml-2"
                            onClick={handleAddToBasket}
                        >
                            افزودن
                        </Button>
                    ) : (
                        <>
                            <Button
                                className="max-w-[120px] text-center ml-2"
                                variant="secondary"
                                onClick={handleRemoveFromBasket}
                            >
                                حذف
                            </Button>
                            <Counter
                                id={data.id}
                                quantity={basketItem?.quantity || 1}
                                onChange={(id, newQty) => updateQuantity(id, newQty)}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="w-1/2 h-full">
                <img
                    src={`https://www.natli.ir/upload/prod/md/${data.thumbnail}.jpg`}
                    className="w-auto h-[160px] object-cover rounded-lg"
                    alt={data.title}
                />
            </div>
        </div>
    );
}
