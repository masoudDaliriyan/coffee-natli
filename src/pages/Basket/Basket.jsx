import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useBasket} from "../../context/BasketContex.jsx";
import Counter from "../../components/Counter/Counter.jsx";
import Button from "../../components/Button/Button.jsx";
import {orderAdd, orderCheck} from "../../services/api.js";
import TextInput from "../../components/Input/Input.jsx";
import Error from '../../components/Error/Error.jsx';
import SelectInput from "../../components/SelectInput/SelectInput.jsx";
import BasketReceipt from "./‌BasketReceipt.jsx";
import {changePayloadForBackend} from "./basketUtils.js";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";
import {RootLink} from "../../components/RootLink/RootLink.jsx";

export default function Basket() {
    const {
        items: basketItems,
        updateQuantity,
        removeItem,
        tableNumber,
        setTableNumber,
        coupon,
        setCoupon
    } = useBasket();
    const [recipient, setRecipient] = useState(null);
    const [isShowRecipt, setIsShowRecipt] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (params.tableNumber) {
            setTableNumber(params.tableNumber);
        }
    }, []);

    const IsValidTableNumber = (value) => {
        return !isNaN(value) && Number.isInteger(Number(value));
    };

    const handleChange = (e) => {
        const {value} = e.target;
        if (IsValidTableNumber(value)) {
            setTableNumber(e.target.value || ' ');
        }
    };

    const handelCouponChange = (e) => {
        setCoupon(e.target.value);
    };


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheckout = async () => {
        if (!basketItems.length) return;
        const payloadItems = changePayloadForBackend(basketItems);

        setLoading(true);
        setError("");

        try {
            const payload = {
                tableNo: tableNumber,
                coupon: coupon,
                prods: payloadItems,
            };

            const checkOrderRes = await orderCheck({
                ...payload,
                payType: 1,
            });

            if (checkOrderRes.status == 0) {
                setError(checkOrderRes.message);
                return
            }

            console.log(checkOrderRes.data);

            setRecipient(checkOrderRes.data);
            setIsShowRecipt(true);

            // const addRes = await orderAdd({
            //     ...payload,
            //     payType: 1,
            // });

            // orderCheck;
            // console.log(addRes);


            // if (addRes.message && addRes.status === 0)
            // {
            // setError(addRes.message);
            // }
            // if (addRes.data?.redirect)
            // {
            // window.location.href = addRes.data.redirect
            // }

        } catch (err) {
            setError(err.message || "خطا در ثبت سفارش");
        } finally {
            setLoading(false);
        }
    };
    const recipientHeader = (
        <>
            <h1 className="text-2xl font-bold mb-4">رسید خرید نهایی</h1>
            <div className="flex gap-8 mb-4 justify-end">
                <Button variant="secondary" onClick={()=>setIsShowRecipt(false)} >برگشت به سبد خرید</Button>
            </div>
        </>
    )
    const header = (
        <>
            <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
            <div className="flex gap-8 mb-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-2">شماره میز</label>
                    <TextInput
                        type="text"
                        value={tableNumber === "0" ? "" : tableNumber || ""}
                        onChange={handleChange}
                        className="text-right w-full border p-1 rounded"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-2">کد تخفیف</label>
                    <TextInput
                        value={coupon === "0" ? "" : coupon || ""}
                        onChange={handelCouponChange}
                        type="text"
                        className="text-right w-full border p-1 rounded"
                    />
                </div>
            </div>
        </>
    )
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

    const recipientFooter = (
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
    )

    const footer = (
        <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 flex justify-center gap-2 items-center"
            variant="success"
        >
            {loading ? "در حال پردازش..." : (
                <>
                    <span>بررسی نهایی و پرداخت</span>
                </>
            )}
        </Button>)

    return (
        <>
            <ModalRoute footer={isShowRecipt ? recipientFooter : footer} header={isShowRecipt ?recipientHeader:header}>
                {error && (
                    <Error message={error}/>
                )}
                <div className="mt-4"></div>
                {
                    basketItems.length === 0 && (
                        <p className="mt-2 text-gray-600">هیچ محصولی در سبد خرید نیست</p>
                    )

                }
                {
                    isShowRecipt && (
                        <>
                            <h1 className="text-lg font-bold mb-4">رسید خرید نهایی</h1>
                            <BasketReceipt recipientData={recipient}/>
                        </>
                    )
                }
                {
                    !isShowRecipt && basketItems.length && (
                        <>
                            <div>
                                {basketItems.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-3 p-3 mb-3 border border-gray-200 rounded-lg bg-white shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://www.natli.ir/upload/prod/md/${item.image}.jpg`}
                                                alt={item.title}
                                                className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                                            />
                                            <div className="flex flex-col flex-1 text-right">
                                                <div className="text-base font-semibold mb-2">{item.title}</div>
                                                <div className="text-gray-600 text-sm mt-1 mb-2">
                                                    <span>
                                                        {Number(item.price * item.quantity).toLocaleString("fa-IR")}
                                                    </span>
                                                    <span> تومان</span>
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
                                        <div className="mt-2">
                                            <div className="list-disc list-inside">
                                                {item.extra.map(extra => (
                                                    <div key={extra.id}>
                                                        {extra.title} - {extra.price.toLocaleString("fa-IR")} تومان
                                                    </div>
                                                ))}
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
                        </>
                    )
                }
            </ModalRoute>
        </>
    );
}
