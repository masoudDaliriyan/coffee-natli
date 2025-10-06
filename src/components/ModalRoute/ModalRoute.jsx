import { useNavigate } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";

export default function ModalRoute({ children }) {
    const navigate = useNavigate();

    const handleClose = () => {
        if (location.state && location.state.background) {
            navigate(-1); // go back to background page
        } else {
            navigate("/", { replace: true }); // fallback to main page
        }
    };

    return <BottomSheet open={true} onClose={handleClose}>{children}</BottomSheet>;
}
