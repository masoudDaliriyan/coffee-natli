import { useNavigate, useLocation } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";

export default function ModalRoute({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        // if (location.state && location.state.background) {
            navigate(-1);
        // } else {
        //     navigate("/", { replace: true });
        // }

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={true} onClose={handleClose}>
            {children}
        </BottomSheet>
    );
}
