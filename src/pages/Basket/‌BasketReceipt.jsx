import { useState } from "react";
import "./basketRecipent.css";
import Button from "../../components/Button/Button";
import { orderAdd } from "../../services/api";
import { useBasket } from "../../context/BasketContex.jsx";
import { changePayloadForBackend } from "./basketUtils";
import ErrorMessage from "../../components/Error/Error.jsx";

const BasketReceipt = ({ recipientData }) =>
{
    const [loading, setLoading] = useState(false);
    const { items: basketItems, coupon, tableNumber } = useBasket();
    const [error, setError] = useState("");

    function formatPrice(value)
    {
        if (value == null || value === "") return "";
        return Number(value).toLocaleString("fa-IR");
    }

    const lastCheckout = async () =>
    {
        const items = changePayloadForBackend(basketItems);
        const payload = {
            tableNo: tableNumber,
            coupon: coupon,
            prods: items,
            payType: 1
        };

        setLoading(true);
        const res = await orderAdd(payload);
        setLoading(false);

        if (res.status !== 1) (
            setError(res.message)
        );

        window.location.href = res.data.redirect;

    };

    const { items: recipientItems = [] } = recipientData;


    return (
        <>
            { error && (
                <ErrorMessage message={ error } />
            ) }
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
                                <div className="mr-2">تعداد: { item.amount }</div>
                                <div>قیمت: { formatPrice(item.fee) } ریال</div>
                                { item.discount && (
                                    <>
                                        <div>تخفیف: { item.discount }%</div>
                                        <div>قیمت پس از تخفیف: { formatPrice(item.fee_after_discount) } ریال</div>
                                    </>
                                ) }
                                <div>قیمت تمام شده { formatPrice(item.sum) } ریال</div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
            <Button
                onClick={ lastCheckout }
                disabled={ loading }
                className="w-full py-4 flex justify-center gap-2 items-center"
                variant="success"
            >
                { loading ? "در حال پردازش..." : (
                    <>
                        <span>پرداخت</span>
                    </>
                ) }
            </Button>
        </>
    );
};

export default BasketReceipt;