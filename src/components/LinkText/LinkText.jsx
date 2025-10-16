import React from "react";
import {Link, Link as RouterLink} from "react-router-dom";

const LinkText = ({
                      to,
                      children,
                      className = "",
                      external = false,
                      asChild = false, // <== prevents wrapping in <a> if true
                      ...props
                  }) => {
    const baseStyles =
        "text-blue-600 underline hover:text-blue-800 transition-colors duration-150";

    // Case 1: external link (real anchor)
    if (external) {
        return (
            <Link
                className={`${baseStyles} ${className}`}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </Link>
        );
    }

    // Case 2: already inside another <Link>
    if (asChild) {
        return <span className={`${baseStyles} ${className}`}>{children}</span>;
    }

    // Case 3: normal internal router link
    return (
        <RouterLink to={to} className={`${baseStyles} ${className}`} {...props}>
            {children}
        </RouterLink>
    );
};

export default LinkText;
