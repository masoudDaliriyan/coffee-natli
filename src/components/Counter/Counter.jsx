import React, { useState } from "react";

export default function Counter({ id, quantity = 1, onChange }) {
    const [value, setValue] = useState(quantity);

    const update = (newValue) => {
        const safe = Math.max(newValue, 1);
        setValue(safe);
        onChange?.(id, safe);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => update(value + 1)}
            >
                +
            </button>
            <span>{value}</span>
            <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => update(value - 1)}
            >
                -
            </button>
        </div>
    );
}
