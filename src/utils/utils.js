import { useNavigate, useParams } from "react-router-dom";

export function useTableNavigate() {
    const navigate = useNavigate();
    const { unique_name, tableNumber } = useParams();

    // Wrap navigate so absolute paths are automatically scoped to the table
    const tableNavigate = (path, options) => {
        // If path starts with '/', treat it as relative to the table
        if (path.startsWith("/")) {
            path = `/coffee-shop/${unique_name}/${tableNumber}${path}`;
        }
        navigate(path, options);
    };

    return tableNavigate;
}
