import './App.css';
import { useState, useEffect } from "react";
import
{
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation, useParams, Navigate,
} from "react-router-dom";

import { branches } from "../branches.json";
const DEFAULT_TABLE = 0;
import Products from './pages/Products/Products.jsx';
import Basket from "./pages/Basket/Basket.jsx";
import Orders from "./pages/Orders/Order.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/SignUp/Signup.jsx";
import OTP from "./pages/OTP/OTP.jsx";
import Sidebar from "./pages/Main/components/SideBar/SideBar.jsx";
import ModalRoute from "./components/ModalRoute/ModalRoute.jsx";
import SearchableProductList from "./pages/Search/Search.jsx";
import Rest from "./pages/Rest/Rest.jsx";
import StoreInfo from "./pages/StoreInfo/StoreInfo.jsx";
function NotFound()
{
    return <div style={ { textAlign: 'center', padding: '20px' } }>صفحه مورد نظر شما پیدا نشد</div>;
}


function AppWrapper()
{

    return (
        <Router basename="/coffee-shop">
            <Routes>
                <Route path="/:unique_name/:tableNumber?/*" element={ <App /> } />
                <Route path="/404" element={ <NotFound /> } />
                <Route path="*" element={ <Navigate to="/404" replace /> } />
            </Routes>
        </Router>
    );
}

function App()
{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { unique_name, tableNumber } = useParams();

    const location = useLocation();


    useEffect(() =>
    {

        const tableNumberValue = Number(tableNumber);

        if(isNaN(tableNumberValue)){
            if(tableNumber==='orders'){
                navigate(`/${ unique_name }/${ DEFAULT_TABLE }/orders`, { replace: true });
            }else {
                navigate(`/${ unique_name }/${ DEFAULT_TABLE }/`, { replace: true });
            }

        }

    }, []);

    useEffect(() =>
    {
        if (!branches.includes(unique_name))
        {
            navigate("/404", { replace: true });
        }
    }, []);

    return (
        <>
            <Sidebar
                isOpen={ isSidebarOpen }
                onClose={ () => setIsSidebarOpen(false) }
            />
            <Products />
            <Routes>
                <Route path="orders" element={ <Orders />} />
                <Route path="signup" element={ <Signup />} />
                <Route path="otp/:mobile" element={ <ModalRoute><OTP /></ModalRoute> } />
                <Route path="login" element={ <Login /> } />
                <Route path="/basket" element={ <Basket /> } />
                <Route path="search" element={ <SearchableProductList />} />
                <Route path="info" element={ <ModalRoute><StoreInfo /></ModalRoute> } />
                <Route path="reset" element={ <ModalRoute><Rest /></ModalRoute> } />
            </Routes>
        </>
    );
}

export default AppWrapper;
