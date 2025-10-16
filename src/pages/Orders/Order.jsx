import React, { useEffect, useState } from "react";
import { myOrders, payOrder } from "../../services/api.js"; // <-- import your API functions

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const getStatusColor = (status) => {
        switch (status) {
            case "تحویل شده":
                return "bg-emerald-100 text-emerald-800";
            case "در حال ارسال":
                return "bg-blue-100 text-blue-800";
            case "در حال پردازش":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return <p className="text-center text-gray-600 mt-10">در حال بارگذاری...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 mt-10">{error}</p>;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">سفارشات من</h1>

            {orders.length === 0 ? (
                <p className="text-gray-600 text-center mt-10">هیچ سفارشی ندارید</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-2xl shadow-md border border-gray-100 bg-white p-5 transition hover:shadow-lg"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        شماره سفارش: {order.orderNumber}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        تاریخ ثبت: {order.cDate}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {/* Items */}
                            {order.items && order.items.length > 0 && (
                                <div className="space-y-3">
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
                                                    <p className="text-sm text-gray-500">
                                                        تعداد: {item.amount}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                {item.sum}
                                                &nbsp;
                                                تومان
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-5 border-t border-gray-100 pt-4">
                                <span className="font-semibold text-gray-700">مجموع سفارش</span>
                                <span className="font-bold text-emerald-600 text-lg">
                                    {/*${order.total?.toFixed(2)}*/}
                                    {order.total}
                                    &nbsp;
                                    تومان
                                </span>
                            </div>

                            {/* Buttons */}
                            {order.canPay >= 1 && (
                                <div className="flex gap-3 mt-5 justify-end">
                                    <button
                                        onClick={() => payOrder(order.id)}
                                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                                    >
                                        پرداخت مجدد
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
