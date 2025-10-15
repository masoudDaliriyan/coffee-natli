import React, { useState } from "react";
import { useBasket } from "../../context/BasketContex.jsx";
import Counter from "../../components/Counter/Counter.jsx";
import Button from "../../components/Button/Button.jsx";
import { orderCheck, orderAdd } from "../../services/api.js"; // ✅ import your API methods

export default function Basket() {
    const {
        items: basketItems,
        updateQuantity,
        removeItem,
        basketTotal,
        clearBasket,
    } = useBasket();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const increaseQuantity = (id) => {
        const item = basketItems.find(item => item.id === id);
        if (item) updateQuantity(id, item.quantity + 1);
    };

    const decreaseQuantity = (id) => {
        const item = basketItems.find(item => item.id === id);
        if (item) updateQuantity(id, Math.max(item.quantity - 1, 1));
    };

    const handleCheckout = async () => {
        if (!basketItems.length) return;

        setLoading(true);
        setError("");

        try {
            const payload = {
                tableNo: "18", // ✅ can make dynamic later
                coupon: "",    // optional
                prods: basketItems.map(item => ({
                    id: item.id,
                    amount: item.quantity,
                    extra_of: null
                })),
            };

            // Step 1: Check order
            const checkRes = await orderCheck(payload);
            console.log("✅ orderCheck:", checkRes);

            // Step 2: Add order (submit)
            const addRes = await orderAdd({
                ...payload,
                payType: 1, // 1 = online, 2 = kiosk
            });
            console.log("✅ orderAdd:", addRes);

            // If backend returns a payment URL or success message:
            console.log(addRes)

            if (addRes?.redirect) {
                window.location.href = addRes.redirect
            } else {
                clearBasket();
            }
        } catch (err) {
            console.error("❌ Checkout error:", err);
            setError(err.message || "خطا در ثبت سفارش");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>

                {error && (
                    <div className="text-red-600 text-sm mb-2">{error}</div>
                )}

                {basketItems.length === 0 ? (
                    <p className="mt-2 text-gray-600">هیچ محصولی در سبد خرید نیست</p>
                ) : (
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

                        <Button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full py-4 flex justify-center gap-2 items-center"
                            variant="success"
                        >
                            {loading ? "در حال پردازش..." : (
                                <>
                                    <span>{basketTotal?.toLocaleString("fa-IR")}&nbsp;تومان</span>
                                    <span>پرداخت</span>
                                </>
                            )}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
