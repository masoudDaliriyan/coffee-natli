import React from "react";

const Button = ({
                    onClick,
                    children,
                    className = "",
                    variant = "primary", // "primary" | "secondary"
                    ...props
                }) => {
    const baseStyles =
        "flex gap-2 font-semibold px-4 py-2 rounded shadow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    let variantStyles = "";

    if (variant === "primary") {
        variantStyles = "bg-[#b6bd00] hover:bg-blue-600 text-white";
    } else if (variant === "secondary") {
        variantStyles =
            "bg-white text-[#3fbbbd] border border-[#3fbbbd] hover:bg-[#3fbbbd] hover:text-white";
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
