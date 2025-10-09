import React from "react";

export default function Counter({ id, quantity = 1, onChange }) {
    const update = (newValue) => {
        const safe = Math.max(newValue, 1);
        onChange?.(id, safe); // always delegate change up
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => update(quantity + 1)}
            >
                +
            </button>
            <span>{quantity}</span>
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => update(quantity - 1)}
            >
                -
            </button>
        </div>
    );
}
