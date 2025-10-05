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
        variantStyles = "bg-[#fff] hover:bg-blue-600  border-gray-300";
    } else if (variant === "secondary") {
        variantStyles =
            "text-[#fff] border-[#3fbbbd] bg-[#292524] ";
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
