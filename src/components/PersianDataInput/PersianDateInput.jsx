import React, { useState } from "react";

const PersianDateInput = ({
                              name = "birthDate",
                              value = "",
                              onChange,
                              className = "",
                              placeholder = "تاریخ تولد (مثلاً 1372/01/01)",
                              ...props
                          }) => {
    const [displayValue, setDisplayValue] = useState(formatWithSlash(value));

    // formats like 13720101 → 1372/01/01
    function formatWithSlash(val) {
        if (!val) return "";
        const digits = val.replace(/\D/g, ""); // remove non-numeric
        const y = digits.slice(0, 4);
        const m = digits.slice(4, 6);
        const d = digits.slice(6, 8);
        let result = y;
        if (m) result += "/" + m;
        if (d) result += "/" + d;
        return result;
    }

    const handleChange = (e) => {
        const raw = e.target.value.replace(/\D/g, ""); // keep digits only
        const formatted = formatWithSlash(raw);
        setDisplayValue(formatted);

        // Send clean value (without slash) back to parent form
        onChange?.({
            target: { name, value: raw },
        });
    };

    return (
        <input
            type="text"
            name={name}
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            inputMode="numeric"
            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

export default PersianDateInput;
