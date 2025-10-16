import React from "react";

const TextInput = ({ className = "", ...props }) => {
    return (
        <input
            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

export default TextInput;
