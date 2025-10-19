import React from "react";
import { Link, useParams } from "react-router-dom";

/**
 * RootLink component
 * - Works like <Link>, but automatically builds paths
 * - Default: navigates from root (/)
 * - If tableNavigation=true → adds /coffee-shop/:unique_name/:tableNumber prefix
 */
export function RootLink({ to, children, tableNavigation = false, ...props }) {
    const { unique_name, tableNumber } = useParams();

    const finalPath = `/${unique_name}/${tableNumber}${to}`

    return (
        <Link to={finalPath} {...props}>
            {children}
        </Link>
    );
}
