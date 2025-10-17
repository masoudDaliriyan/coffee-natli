import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ProductProvider} from "./context/ProductContext.jsx";
import {BasketProvider} from "./context/BasketContex.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BasketProvider>
            <AuthProvider>
                <SidebarProvider>
                    <ProductProvider>
                        <App/>
                    </ProductProvider>
                </SidebarProvider>
            </AuthProvider>
        </BasketProvider>
    </StrictMode>,
)
