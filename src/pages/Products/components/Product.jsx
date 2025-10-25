import React, {useState} from "react";
import Button from "../../../components/Button/Button.jsx";
import Counter from "../../../components/Counter/Counter.jsx";
import {useBasket} from "../../../context/BasketContex.jsx";
import CheckboxInput from "../../../components/InputCheckbox/InputCheckbox.jsx"

export default function Product({data}) {
    const {getItem, addItem, removeItem, updateQuantity, isItemExist, addExtraToItem,isExtraSelected,removeExtraFromItem} = useBasket();
    const [selectedExtras, setSelectedExtras] = useState([]);

    const basketItem = getItem(data.id);


    const getProductExtras = (productId, basket) => {
        const item = getItem(productId); // assumes basket has getItem
        console.log(item)
        return item?.extras || [];
    };

    const handleAddToBasket = () => {
        addItem({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.thumbnail,
            extras: selectedExtras, // store selected extras in basket
        });
    };

    const handleRemoveFromBasket = () => {
        removeItem(data.id);
    };

    const handleExtraChange = (productId,extra) => {
        if(isExtraSelected(productId,extra.id)){
            removeExtraFromItem(productId,extra.id)
            return
        }

        addExtraToItem(productId,extra)

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
                    <div className="flex flex-wrap gap-2">
                        {data.extra.map((item) => (
                            <div
                                key={item.id}
                                className="flex-1  max-w-[50%] px-2 mb-2 flex items-center justify-between border rounded p-2 hover:bg-gray-50"
                            >
                                <div className="flex items-center space-x-2">
                                    <CheckboxInput
                                        checked={isExtraSelected(data.id,item.id)}
                                        onChange={() => handleExtraChange(data.id,item)}
                                    />
                                    <span className="text-sm">{item.title}</span>
                                </div>
                                <img
                                    src={`https://www.natli.ir/upload/prod/md/${item.thumbnail}.jpg`}
                                    alt={item.title}
                                    className="w-10 h-10 object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
