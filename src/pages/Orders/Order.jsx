import React, {useEffect, useState} from "react";
import {myOrders, payOrder} from "../../services/api.js";
import DefaultSkeleton from "../../components/DefaultSkeleton/DefaultSkeleton.jsx";
import ArrowUp from '../../../public/icons/arrowUp.svg';
import ArrowDown from '../../../public/icons/arrowDown.svg';
import Error from '../../components/Error/Error.jsx';
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orderErrors, setOrderErrors] = useState({});
    const [openOrders, setOpenOrders] = useState({}); // track which orders are open

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await myOrders();
                setOrders(res.data.orders || []);
            } catch (err) {
                setError("خطا در دریافت سفارشات");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const toggleOrder = (orderId) => {
        setOpenOrders((prev) => ({...prev, [orderId]: !prev[orderId]}));
    };

    const handelPayOrder = async (order) => {
        try {
            const res = await payOrder(order.id);

            if (res.message && res.status === 0) {
                setOrderErrors((prev) => ({...prev, [order.id]: res.message}));
            } else {
                setOrderErrors((prev) => ({...prev, [order.id]: ""}));
            }

            if (res.data?.redirect) {
                window.location.href = res.data.redirect;
            }
        } catch (err) {
            setOrderErrors((prev) => ({...prev, [order.id]: "خطا در پرداخت"}));
        }
    };

    if (loading) return <div className="px-4"><DefaultSkeleton/></div>;

    const header = (
        <h1 className="text-2xl font-bold mb-6 text-gray-800">سفارشات من</h1>
    )

    return (
        <ModalRoute header={header}>
            <div className="max-w-5xl mx-auto">
                {error && <Error message={error}/>}
                {orders.length === 0 ? (
                    <p className="text-gray-600 text-center mt-10">هیچ سفارشی ندارید</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const isOpen = openOrders[order.id];

                            return (
                                <div
                                    key={order.id}
                                    className="rounded-2xl shadow-md border border-gray-100 bg-white p-5 transition hover:shadow-lg"
                                >
                                    <div
                                        className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100 cursor-pointer">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                شماره سفارش: {order.orderNumber}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                تاریخ ثبت: {order.cDate}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100`}>
                                        {order.status_title}
                                    </span>
                                    </div>

                                    {/* Toggle Accordion */}
                                    <div onClick={() => toggleOrder(order.id)}
                                         className="flex items-center gap-2 cursor-pointer mt-2">
                                        {isOpen ? (
                                            <img src={ArrowUp} width={20} alt="باز شدن"/>
                                        ) : (
                                            <img src={ArrowDown} width={20} alt="بستن"/>
                                        )}
                                        <span className="text-gray-700 font-medium">جزئیات سفارش</span>
                                    </div>

                                    {/* Items Accordion */}
                                    {isOpen && order.items && order.items.length > 0 && (
                                        <div className="space-y-3 mt-3">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between items-center bg-gray-50 rounded-xl p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={`https://www.natli.ir/upload/prod/md/${item.prod_pics}.jpg`}
                                                            alt={item.title}
                                                            className="w-20 h-20 object-cover rounded-xl"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-gray-800">{item.title}</p>
                                                            <p className="text-sm text-gray-500">تعداد: {item.amount}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-semibold text-gray-800">{item.sum} تومان</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div
                                        className="flex justify-between items-center mt-5 border-t border-gray-100 pt-4">
                                        <span className="font-semibold text-gray-700">مجموع سفارش</span>
                                        <span className="font-bold text-emerald-600 text-lg">{order.total} تومان</span>
                                    </div>

                                    {orderErrors[order.id] && (
                                        <p className="text-red-600 mt-2">{orderErrors[order.id]}</p>
                                    )}

                                    {order.canPay >= 1 && (
                                        <div className="flex gap-3 mt-5 justify-end">
                                            <button
                                                onClick={() => handelPayOrder(order)}
                                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                                            >
                                                پرداخت مجدد
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </ModalRoute>
    );
}
