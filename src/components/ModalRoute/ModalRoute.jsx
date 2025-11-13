import { useNavigate, useParams } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";

export default function ModalRoute({ children, ...props }) {
    const rootNavigate = useRootNavigate();

    const handleClose = () => {
        rootNavigate("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={true} onClose={handleClose} {...props}>
            {children}
        </BottomSheet>
    );
}
