import { useParams, useNavigate } from "react-router-dom";

/**
 * useRootNavigate
 * - Works like useNavigate, but automatically prefixes paths with /:unique_name/:tableNumber
 * - If { root: true } → skips prefix and navigates from the site root
 */
export function useRootNavigate() {
    const navigate = useNavigate();
    const { unique_name, tableNumber } = useParams();

    const rootNavigate = (to, options = {}) => {
        const { root = false, replace = false, state } = options;
        let path  =   `/${unique_name}/${tableNumber}/${to}/`;

        if(!tableNumber){
            path = `/${unique_name}/0/${to}`;
        }



        navigate(path, { replace, state });
    };

    return rootNavigate;
}
