import React from "react";
import Header from "../Main/components/Header/Header.jsx";

export default function Orders() {
    const orders = [
        {
            id: 1,
            orderNumber: "ORD-78945",
            date: "۱۴۰۲/۱۰/۱۵",
            status: "تحویل شده",
            items: [
                { id: 1, title: "باقلوا", price: 12.99, quantity: 2, image: "/products/1.jpg" },
                { id: 4, title: "نان خامه ای", price: 5.99, quantity: 1, image: "/products/4.jpg" },
            ],
            total: 31.97,
        },
        {
            id: 2,
            orderNumber: "ORD-78213",
            date: "۱۴۰۲/۱۰/۱۰",
            status: "تحویل شده",
            items: [
                { id: 3, title: "شیرینی دانمارکی", price: 39.99, quantity: 1, image: "/products/3.jpg" },
                { id: 5, title: "کلوچه", price: 8.5, quantity: 3, image: "/products/5.jpg" },
            ],
            total: 65.49,
        },
        {
            id: 3,
            orderNumber: "ORD-78123",
            date: "۱۴۰۲/۱۰/۰۵",
            status: "در حال ارسال",
            items: [{ id: 2, title: "کیک یزدی", price: 7.49, quantity: 4, image: "/products/2.jpg" }],
            total: 29.96,
        },
    ];

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

    return (
        <>
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
                                        <p className="text-sm text-gray-500 mt-1">تاریخ: {order.date}</p>
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
                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center bg-gray-50 rounded-xl p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-cover rounded-xl"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.title}</p>
                                                    <p className="text-sm text-gray-500">
                                                        تعداد: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center mt-5 border-t border-gray-100 pt-4">
                                    <span className="font-semibold text-gray-700">مجموع سفارش</span>
                                    <span className="font-bold text-emerald-600 text-lg">
                    ${order.total.toFixed(2)}
                  </span>
                                </div>

                                {/* Buttons */}
                                {/*<div className="flex gap-3 mt-5 justify-end">*/}
                                {/*    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">*/}
                                {/*        مشاهده فاکتور*/}
                                {/*    </button>*/}
                                {/*    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">*/}
                                {/*        سفارش مجدد*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
