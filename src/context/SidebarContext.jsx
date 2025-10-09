import React, {createContext, useContext, useState} from "react";

// Create a Sidebar Context
const SidebarContext = createContext();

// Provider component
export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const toggleSidebar = () => setIsOpen(prev => !prev);


    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar, activeItem, setActiveItem }}>
            {children}
        </SidebarContext.Provider>
    );
}

// Custom hook for easier access
export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }
    return context;
}
