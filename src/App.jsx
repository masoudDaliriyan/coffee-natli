import './App.css';
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";

// pages
import Products from './pages/Products/Products.jsx';
import { ProductDetails } from "./pages/Product/ProductDetail.jsx";
import Basket from "./pages/Basket/Basket.jsx";
import Orders from "./pages/Orders/Order.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/SignUp/Signup.jsx";
import OTP from "./pages/OTP/OTP.jsx";

// components & context
import Sidebar from "./pages/Main/components/SideBar/SideBar.jsx";
import ModalRoute from "./components/ModalRoute/ModalRoute.jsx";
import SearchableProductList from "./pages/Search/Search.jsx";
import Rest from "./pages/Rest/Rest.jsx";

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
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
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/orders" element={<ModalRoute><Orders /></ModalRoute>} />
                <Route path="/signup" element={<ModalRoute><Signup /></ModalRoute>} />
                <Route path="/otp/:mobile" element={<ModalRoute><OTP /></ModalRoute>} />
                <Route path="/login" element={<ModalRoute><Login /></ModalRoute>} />
                <Route path="/basket" element={<ModalRoute><Basket /></ModalRoute>} />
                <Route path="/search" element={<ModalRoute><SearchableProductList /></ModalRoute>} />
                <Route path="/reset" element={<ModalRoute><Rest /></ModalRoute>} />
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
