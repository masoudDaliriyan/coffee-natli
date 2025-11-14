import React from "react";

export default function Counter({ id, quantity = 1, onChange }) {
    const update = (newValue) => {
        const safe = Math.max(newValue, 1);
        onChange?.(id, safe);
    };

    return (
        <div className="flex items-center gap-2 text-sm">
            <button
                className="bg-gray-300 px-2 py-1 rounded text-sm"
                onClick={() => update(quantity + 1)}
            >
                +
            </button>

            <span className="text-sm">{quantity}</span>

            <button
                className="bg-gray-300 px-2 py-1 rounded text-sm"
                onClick={() => update(quantity - 1)}
            >
                -
            </button>
        </div>
    );
}
