import { useState } from "react";
import "./basketRecipent.css";
import { useBasket } from "../../context/BasketContex.jsx";

const BasketReceipt = ({ recipientData }) =>
{
    const { items: basketItems, coupon, tableNumber } = useBasket();


    function formatPrice(value)
    {
        if (value == null || value === "") return "";
        return Number(value).toLocaleString("fa-IR");
    }



    const { items: recipientItems = [] } = recipientData;


    return (
        <>
            <div className="max-w-md mx-auto">
                { recipientItems.map(item => (
                    <div
                        key={ item.id }
                        className="flex items-center gap-4 p-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                    >
                        <div className="flex-1 text-right">
                            <div className="text-base font-semibold mb-2">{ item.title }</div>
                            { item.price && (
                                <div className="text-gray-500 text-sm">
                                    { Number(item.price * item.amount).toLocaleString("fa-IR") } ریال
                                </div>
                            ) }
                            <div className="mt-2">
                                <div>تعداد: { item.amount }</div>
                                {
                                    !item.discount && (
                                        <div>قیمت: { formatPrice(item.fee) } ریال</div>
                                    )
                                }
                                { item.discount && (
                                    <>
                                        <div>
                                            قیمت:
                                            &nbsp;
                                            <span className="line-through">{formatPrice(item.fee)} ریال </span>
                                            &nbsp;
                                            <span className="inline-block text-green-700 text-sm font-medium border border-green-400 rounded-[13px] px-2 py-1 bg-green-50">
                                                {item.discount} %
                                            </span>
                                            &nbsp;
                                            <span>
                                                 {formatPrice(item.fee_after_discount) } ریال
                                            </span>
                                        </div>
                                    </>
                                ) }
                                {
                                    item.amount > 1 && (
                                        <div>
                                            مجموع
                                            :
                                            &nbsp;
                                            { formatPrice(item.sum) } ریال</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </>
    );
};

export default BasketReceipt;
