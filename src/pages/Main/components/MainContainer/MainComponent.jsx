import React from "react";

const MainContainer = ({ children, className = "", ...props }) => {
    return (
        <div
            className={`p-4 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default MainContainer;
