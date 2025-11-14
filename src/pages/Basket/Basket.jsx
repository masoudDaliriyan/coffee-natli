import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useBasket} from "../../context/BasketContex.jsx";
import Button from "../../components/Button/Button.jsx";
import {orderAdd, orderCheck} from "../../services/api.js";
import TextInput from "../../components/Input/Input.jsx";
import Error from '../../components/Error/Error.jsx';
import BasketReceipt from "./‌BasketReceipt.jsx";
import {changePayloadForBackend} from "./basketUtils.js";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";
import {RootLink} from "../../components/RootLink/RootLink.jsx";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage.jsx";
import Product from "../Products/components/Product.jsx";

export default function Basket() {
    const {
        items: basketItems,
        tableNumber,
        setTableNumber,
        coupon,
        setCoupon,
        clearBasket
    } = useBasket();
    const [recipient, setRecipient] = useState(null);
    const [isShowRecipt, setIsShowRecipt] = useState(false);
    const [isShowCashierPay, setIsShowCashierPay] = useState(false)
    const params = useParams();
    const [payType, setPayType] = useState("");
    const [orderId, setOrderId] = useState(null)

    const onChangePayType = (e) => {
        setPayType(e.target.value)
    }


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
    const [basketError, setBasketError] = useState("");
    const [recipientError, setRecipientError] = useState("");

    const handleCheckout = async () => {
        if (!basketItems.length) return;
        const payloadItems = changePayloadForBackend(basketItems);

        setLoading(true);
        setBasketError("");

        try {
            const payload = {
                tableNo: tableNumber,
                coupon: coupon,
                prods: payloadItems,
            };

            const checkOrderRes = await orderCheck({
                ...payload,
                payType: payType,
            });

            if (checkOrderRes.status === 0) {
                setBasketError(checkOrderRes.message);
                setLoading(false)
                return
            }


            setRecipient(checkOrderRes.data);
            setIsShowRecipt(true);
        } catch (err) {
            setBasketError(err.message || "خطا در ثبت سفارش");
        } finally {
            setLoading(false);
        }
    };
    const recipientHeader = (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">رسید خرید نهایی</h1>
            <div className="flex gap-8 justify-end">
                <Button variant="secondary" onClick={() => setIsShowRecipt(false)}>برگشت به سبد خرید</Button>
            </div>
        </>
    )
    const header = (
        <h1 className="text-2xl font-bold text-center">سبد خرید</h1>
    )

    const cashierHeader = (
        <h1 className="text-2xl font-bold text-center">پرداخت کیوسک شعبه</h1>
    )

    const cashier = (
        <div className="text-2xl font-bold my-4">
            <SuccessMessage message={"سفارش شما ثبت شد. می توانید از کیوسک مستقر در شعبه، صورتحساب خود را پرداخت نمایید."}></SuccessMessage>
            <div className="text-center">
                شماره سفارش:  {orderId}
            </div>
        </div>
    )

    const cashierFooter = (
        <RootLink to="/orders">
            <Button
                className="w-full py-4 flex justify-center gap-2 items-center"
                variant="success"
            >
                لیست سفارشات
            </Button>
        </RootLink>
    )

    const lastCheckout = async () => {
        const items = changePayloadForBackend(basketItems);
        const payload = {
            tableNo: tableNumber,
            coupon: coupon,
            prods: items,
            payType: payType
        };

        setLoading(true);
        const res = await orderAdd(payload);

        if (res.status !== 1) {
            setRecipientError(res.message);
            setLoading(false)
            return;
        }

        if (res.data.order_id) {
            setIsShowRecipt(false)
            setIsShowCashierPay(true)
            setOrderId(res.data.order_id)
            clearBasket()
            return
        }

        window.location.href = res.data.redirect;
    };

    const recipientFooter = (
        <>
            {recipientError && (
                <Error message={recipientError}/>
            )}
            <div className="pb-4 flex space-x-4">
                <div>
                    روش پرداخت
                </div>
                <div>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" checked={payType === "1"} value="1"
                               onChange={onChangePayType}/>
                        <span> آنلاین</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" checked={payType === "2"} value="2"
                               onChange={onChangePayType}/>
                        <span> کارتخوان کیوسک شعبه</span>
                    </label>
                </div>
            </div>
            <Button
                onClick={lastCheckout}
                disabled={loading}
                className="w-full py-4 flex justify-center gap-2 items-center"
                variant="success"
            >
                {loading ? "در حال پردازش..." : (
                    <>
                        <span>
                            پرداخت
                            &nbsp;
                            {recipient?.sum?.toLocaleString("fa-IR")}
                            &nbsp;
                            ریال
                        </span>
                    </>
                )}
            </Button>
        </>
    )

    const footer = (
        <>
            {basketError && (
                <Error message={basketError}/>
            )}
            {
                basketItems.length > 0 && (
                    <>
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
                        </Button>
                    </>
                )
            }
        </>
    )

    return (
        <>
            <ModalRoute footer={isShowRecipt ? recipientFooter : isShowCashierPay ? cashierFooter : footer}
                        header={isShowRecipt ? recipientHeader : isShowCashierPay ? cashierHeader :header}>

                <div className="mt-4"></div>
                {
                    isShowRecipt && (
                        <BasketReceipt recipientData={recipient}/>
                    )
                }
                {
                    isShowCashierPay && (
                        cashier
                    )
                }
                {
                    !isShowRecipt && !isShowCashierPay && (
                        <>
                            {
                                basketItems.length < 1 && (
                                    <p className="mt-2 text-gray-600 text-center">هیچ محصولی در سبد خرید نیست</p>
                                )
                            }
                            <div>
                                {basketItems.map(item => (
                                    <Product data={item}></Product>
                                ))}
                            </div>
                        </>
                    )
                }
            </ModalRoute>
        </>
    );
}
