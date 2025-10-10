import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ProductProvider} from "./context/ProductContext.jsx";
import {BasketProvider} from "./context/BasketContex.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <SidebarProvider>
              <BasketProvider>
                  <ProductProvider>
                      <App />
                  </ProductProvider>
              </BasketProvider>
          </SidebarProvider>
      </AuthProvider>
  </StrictMode>,
)
