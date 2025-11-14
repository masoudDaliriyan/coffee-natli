import React, {useState} from "react";
import Button from "../../../components/Button/Button.jsx";
import Counter from "../../../components/Counter/Counter.jsx";
import {useBasket} from "../../../context/BasketContex.jsx";
import CheckboxInput from "../../../components/InputCheckbox/InputCheckbox.jsx"

export default function Product({data}) {
    const {
        getItem,
        addItem,
        removeItem,
        updateQuantity,
        isItemExist,
        addExtraToItem,
        isExtraSelected,
        removeExtraFromItem,
        updateQuantityItemExtra,
        getExtraById
    } = useBasket();
    const basketItem = getItem(data.id);


    const normalizeValue = (value) => {
        const num = Number(value);
        return isNaN(num) ? 1 : num;
    };


    const onExtraCounterChange = (item, extraId, newQuantity) => {
        updateQuantityItemExtra(item, extraId, newQuantity)
    }

    const handleAddToBasket = () => {
        console.log(data.extra)
        addItem({
            id: data.id,
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail,
            extra: [],
            quantity: 1
        });
    };

    const handleRemoveFromBasket = () => {
        removeItem(data.id);
    };

    const handleExtraChange = (productId, extraItem) => {

        if (isExtraSelected(productId, extraItem.id)) {
            removeExtraFromItem(productId, extraItem)
            return
        }

        addExtraToItem(productId, extraItem)

    };


    return (
        <div className="p-4 shadow-sm hover:shadow-md transition w-full flex rounded-lg flex flex-col">
            <div className="flex">
                <div className="w-1/2 flex flex-col justify-between ">
                    <div>
                        <h2 className="mt-2 font-semibold text-lg">{data.title}</h2>

                        {!data.discount && (
                            <p className="text-gray-700">
                                ریال {Number(data.price).toLocaleString()}
                            </p>
                        )}
                        {data.discount && (
                            <>
                                <p className="text-gray-700">
                                    ریال {Number(data.price_after_discount).toLocaleString()}
                                </p>
                                <div>{data.discount}% تخفیف</div>
                            </>
                        )}
                    </div>


                    <div className="flex mt-3">
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
            {data?.extra?.length > 0 && isItemExist(data.id) && (
                <div className="mt-3  pt-2">
                    <h4 className="font-medium mb-1 text-sm text-gray-700">انتخاب موارد اضافه:</h4>
                    <div className="flex  gap-2">
                        {data.extra.map((item) => (
                            <div
                                key={item.id}
                                className="flex-1 flex flex-wrap flex-col max-w-[50%] px-2 mb-2  items-center  justify-between border rounded p-2 hover:bg-gray-50  items-start flex-col gap-1"
                            >
                                <div className="flex items-center space-x-2">
                                    <CheckboxInput
                                        checked={isExtraSelected(data.id, item.id)}
                                        onChange={() => handleExtraChange(data.id, item)}
                                    />
                                    <span className="text-sm">{item.title}</span>
                                </div>
                                <div className="flex mt-2 gap-1">
                                    <div className="mt-2 text-[13px]">
                                        {item.price.toLocaleString('fa-IR')}&nbsp;ریال
                                    </div>
                                    {
                                        isExtraSelected(data.id, item.id) && (
                                            <Counter id={item.id}
                                             quantity={getExtraById(data, item.id)?.quantity || 1}
                                             onChange={(id, newQty) => onExtraCounterChange(data, id, newQty)}/>)
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
