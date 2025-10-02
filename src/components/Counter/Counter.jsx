import React from "react";
export default function Counter({ id, quantity, onChange }) {
    const increase = () => onChange(id, quantity + 1);
    const decrease = () => onChange(id, Math.max(quantity - 1, 1));

    return (
        <div className="flex items-center gap-2">
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={decrease}
            >
                -
            </button>
            <span>{quantity}</span>
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={increase}
            >
                +
            </button>
        </div>
    );
}
