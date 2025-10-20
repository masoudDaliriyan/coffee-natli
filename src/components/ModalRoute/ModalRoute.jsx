import { useNavigate, useLocation, useParams } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";

export default function ModalRoute({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const handleClose = () => {
        // Recreate base route from params
        const basePath = `/${params.unique_name}/${params.tableNumber}/`;

        navigate(basePath);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={true} onClose={handleClose}>
            {children}
        </BottomSheet>
    );
}
