import React from "react";
import Header from "../Main/components/Header/Header.jsx";

export default function Orders()
{
    // Fake orders data - past orders
    const orders = [
        {
            id: 1,
            orderNumber: "ORD-78945",
            date: "۱۴۰۲/۱۰/۱۵",
            status: "تحویل شده",
            items: [
                { id: 1, title: "باقلوا", price: 12.99, quantity: 2, image: "/products/1.jpg" },
                { id: 4, title: "نان خامه ای", price: 5.99, quantity: 1, image: "/products/4.jpg" }
            ],
            total: 31.97
        },
        {
            id: 2,
            orderNumber: "ORD-78213",
            date: "۱۴۰۲/۱۰/۱۰",
            status: "تحویل شده",
            items: [
                { id: 3, title: "شیرینی دانمارکی", price: 39.99, quantity: 1, image: "/products/3.jpg" },
                { id: 5, title: "کلوچه", price: 8.50, quantity: 3, image: "/products/5.jpg" }
            ],
            total: 65.49
        },
        {
            id: 3,
            orderNumber: "ORD-78123",
            date: "۱۴۰۲/۱۰/۰۵",
            status: "در حال ارسال",
            items: [
                { id: 2, title: "کیک یزدی", price: 7.49, quantity: 4, image: "/products/2.jpg" }
            ],
            total: 29.96
        }
    ];

    const getStatusColor = (status) =>
    {
        switch (status)
        {
            case "تحویل شده": return "bg-green-100 text-green-800";
            case "در حال ارسال": return "bg-blue-100 text-blue-800";
            case "در حال پردازش": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <Header></Header>
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">سفارشات من</h1>

                { orders.length === 0 ? (
                    <p className="text-gray-600">هیچ سفارشی ندارید</p>
                ) : (
                    <div className="space-y-6">
                        { orders.map((order) => (
                            <div key={ order.id } className="border rounded-lg p-6 shadow-sm bg-white">
                                {/* Order Header */ }
                                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-lg">شماره سفارش: { order.orderNumber }</p>
                                        <p className="text-sm text-gray-600">تاریخ: { order.date }</p>
                                    </div>
                                    <span className={ `px-3 py-1 rounded-full text-sm font-medium ${ getStatusColor(order.status) }` }>
                                        { order.status }
                                    </span>
                                </div>

                                {/* Order Items */ }
                                <div className="space-y-4 mb-4">
                                    { order.items.map((item) => (
                                        <div key={ item.id } className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={ item.image }
                                                    alt={ item.title }
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <p className="font-medium">{ item.title }</p>
                                                    <p className="text-sm text-gray-600">
                                                        تعداد: { item.quantity }
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-medium">
                                                ${ (item.price * item.quantity).toFixed(2) }
                                            </p>
                                        </div>
                                    )) }
                                </div>

                                {/* Order Footer */ }
                                <div className="flex justify-between items-center border-t pt-4">
                                    <span className="font-bold text-lg">مجموع سفارش</span>
                                    <span className="font-bold text-lg">${ order.total.toFixed(2) }</span>
                                </div>

                                {/* Action Buttons */ }
                                <div className="flex gap-3 mt-4">
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        مشاهده فاکتور
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        سفارش مجدد
                                    </button>
                                </div>
                            </div>
                        )) }
                    </div>
                ) }
            </div>
        </>
    );
}
