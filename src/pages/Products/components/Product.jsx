import React, {useEffect} from "react";
import Button from "../../../components/Button/Button.jsx";
import Counter from "../../../components/Counter/Counter.jsx";
import {useBasket} from "../../../context/BasketContex.jsx";

export default function Product({data}) {
    const {
        items,
        getItems,
        getItem,
        addItem,
        removeItem,
        clearBasket,
        isItemExist,
        updateQuantity,
        basketTotal,
        itemCount}  = useBasket()

    const handleAddToBasket = (product) =>
    {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
    };

    const handleRemoveFromBasket = (id) => {
        removeItem(id)
    }

    return (
        <div className="p-4 shadow-sm hover:shadow-md transition w-full flex rounded-lg">
            <div className="w-1/2 flex flex-col justify-between pr-4">
                <div>
                    <h2 className="mt-2 font-semibold text-lg">{data.title}</h2>
                    <p className="text-gray-700"> ریال {data.price}</p>
                </div>
                {isItemExist(data.id)}
                <div className="flex">
                    {isItemExist(data.id)}
                    {
                        !isItemExist(data.id) && (
                            <Button
                                className="max-w-[90px] text-center ml-2"
                                onClick={() => handleAddToBasket(data)}
                            >
                                افزودن
                            </Button>
                        )
                    }
                    {
                        isItemExist(data.id) && (
                            <>
                                <Button
                                    className="max-w-[120px] text-center ml-2"
                                    variant="secondary"
                                    onClick={() => handleRemoveFromBasket(data.id)}
                                >
                                    حذف
                                </Button>
                                <Counter id={data.id} quantity={getItem(data.id).quantity}></Counter>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="w-1/2 h-full">
                <img
                    src={'https://www.natli.ir/upload/prod/md/'+data.thumbnail+'.jpg'}
                    className="w-auto h-[160px] object-cover rounded-lg"
                />
            </div>
        </div>
    );
}
