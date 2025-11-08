import { useNavigate, useParams } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";

export default function ModalRoute({ children, ...props }) {
    const navigate = useNavigate();
    const params = useParams();

    const handleClose = () => {
        let basePath = `/${params.unique_name}/`;

        if (params.table_number) {
            basePath += `${params.table_number}/`;
        }

        navigate(basePath);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={true} onClose={handleClose} {...props}>
            {children}
        </BottomSheet>
    );
}
