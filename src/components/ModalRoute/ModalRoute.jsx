import { useNavigate, useParams } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";

export default function ModalRoute({ children, ...props }) {
    const rootNavigate = useRootNavigate();
    const params = useParams();

    const handleClose = () => {
        let basePath = `/${params.unique_name}/`;

        if (params.table_number) {
            basePath += `${params.table_number}/`;
        }

        rootNavigate(basePath);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={true} onClose={handleClose} {...props}>
            {children}
        </BottomSheet>
    );
}
