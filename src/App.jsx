import './App.css';
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation, useParams, Navigate,
} from "react-router-dom";

import Products from './pages/Products/Products.jsx';
import { ProductDetails } from "./pages/Product/ProductDetail.jsx";
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
function NotFound() {
    return <div>Page not found</div>;
}

const branches = [
    "sohrevardi-1",
    "sohrevardi-2",
    "poonak",
    "dibaji"
];

function AppWrapper() {
    return (
        <Router basename="/coffee-shop">
            <Routes>
                <Route path="/:unique_name/:tableNumber/*" element={<AppWithParamsCheck />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </Router>
    );
}

function AppWithParamsCheck() {
    const { unique_name, tableNumber } = useParams();

    if (!branches.includes(unique_name)) {
        return <Navigate to="/404" replace />;
    }

    return <App />;
}




function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const state = location.state && location.state.background;

    return (
        <>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Products />
            <Routes>
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="orders" element={<ModalRoute><Orders /></ModalRoute>} />
                <Route path="signup" element={<ModalRoute><Signup /></ModalRoute>} />
                <Route path="otp/:mobile" element={<ModalRoute><OTP /></ModalRoute>} />
                <Route path="login" element={<ModalRoute><Login /></ModalRoute>} />
                <Route path="basket" element={<ModalRoute><Basket /></ModalRoute>} />
                <Route path="search" element={<ModalRoute><SearchableProductList /></ModalRoute>} />
                <Route path="info" element={<ModalRoute><StoreInfo /></ModalRoute>} />
                <Route path="reset" element={<ModalRoute><Rest /></ModalRoute>} />
            </Routes>
            {state && (
            <Routes>
                <Route path="/signup" element={<ModalRoute><Signup /></ModalRoute>} />
                <Route path="/otp" element={<ModalRoute><OTP /></ModalRoute>} />
            </Routes>
            )}
        </>
    );
}

export default AppWrapper;
