import { useNavigate, useLocation, useParams } from "react-router-dom";
import BottomSheet from "./BottomSheet.jsx";

export default function ModalRoute({ children })
{
    const navigate = useNavigate();
    const params = useParams();

    const handleClose = () =>
    {
        // Recreate base route from params
        let basePath = `/${ params.unique_name }/`;

        if (params.table_number)
        {
            basePath += `${ params.table_number }/`;
        }

        navigate(basePath);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <BottomSheet open={ true } onClose={ handleClose }>
            { children }
        </BottomSheet>
    );
}
