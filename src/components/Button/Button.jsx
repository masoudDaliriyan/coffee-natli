import React from "react";

const Button = ({
                    children,
                    className = "",
                    variant = "primary", // "primary" | "secondary"
                    ...props
                }) => {
    const baseStyles =
        "flex gap-2 font-semibold px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border";

    let variantStyles = "";

    if (variant === "primary") {
        variantStyles = "bg-white border-gray-300 text-black";
    } else if (variant === "secondary") {
        variantStyles = "bg-gray-900 border-gray-500 text-white";
    } else if (variant === "success") {
        variantStyles = "bg-green-700 border-green-800 text-white";
    }


    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
