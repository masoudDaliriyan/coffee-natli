import { useParams, useNavigate } from "react-router-dom";

/**
 * useRootNavigate
 * Works like useNavigate, but automatically prefixes paths with /:unique_name/:tableNumber
 * If options.root === true → skips prefix and navigates from site root
 */
export function useRootNavigate()
{
    const navigate = useNavigate();
    const { unique_name, tableNumber } = useParams();

    const rootNavigate = (to, options = {}) =>
    {
        const { root = false, replace = false, state } = options;

        let path = to;

        if (!root)
        {
            const table = tableNumber ?? "0";
            path = `/${ unique_name }/${ table }/${ to }`;
        }

        navigate(path, { replace, state });
    };

    return rootNavigate;
}
