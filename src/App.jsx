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
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { BasketProvider } from "./context/BasketContex.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

function AppWrapper() {
    return (
        <SidebarProvider>
            <BasketProvider>
                <ProductProvider>
                    <Router>
                        <App />
                    </Router>
                </ProductProvider>
            </BasketProvider>
        </SidebarProvider>
    );
}

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // If we navigated with a background state, save it
    const state = location.state && location.state.background;

    return (
        <>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Products />
            <Routes >
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/otp" element={<OTP />} />
                <Route path="/login" element={<ModalRoute><Login /></ModalRoute>} />
            </Routes>

            {/* Modal routes (only if navigated with background) */}
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
