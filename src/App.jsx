import './App.css';
import Products from './pages/Products/Products.jsx';
import Sidebar from "./pages/Main/components/SideBar/SideBar.jsx";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductDetails } from "./pages/Product/ProductDetail.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import Basket from "./pages/Basket/Basket.jsx";
import Login from "./pages/Login/Login.jsx";
import { BasketProvider } from "./context/BasketContex.jsx";
import Signup from "./pages/SignUp/Signup.jsx";
import Orders from "./pages/Orders/Order.jsx";
import OTP from "./pages/OTP/OTP.jsx";

function App()
{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <SidebarProvider>
            <BasketProvider>
                <Router>
                    <Sidebar
                        isOpen={ isSidebarOpen }
                        onClose={ () => setIsSidebarOpen(false) }
                    />
                    <Routes>
                        <Route path="/" element={ <Products /> } />
                        <Route path="/products/:id" element={ <ProductDetails /> } />
                        <Route path="/basket/" element={ <Basket /> } />
                        <Route path="/login/" element={ <Login /> } />
                        <Route path="/signup/" element={ <Signup /> } />
                        <Route path="/orders" element={ <Orders /> } />
                        <Route path="/otp" element={ <OTP /> } />
                    </Routes>
                </Router>
            </BasketProvider>
        </SidebarProvider>
    );
}

export default App;
