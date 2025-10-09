import React, { createContext, useContext, useState, useCallback } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
    const [items, setItems] = useState([]);

    // Get all items
    const getItems = () => items;

    // Get single item by id
    const getItem = (itemId) => items.find(item => item.id === itemId);

    // Add or update item
    const addItem = (newItem) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === newItem.id);
            if (!existingItem) return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];

            return currentItems.map(item =>
                item.id === newItem.id
                    ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                    : item
            );
        });
    };

    // Remove item
    const removeItem = (itemId) => {
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    };

    // Clear basket
    const clearBasket = () => setItems([]);

    // Update quantity
    const updateQuantity = (itemId, newQuantity) => {
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Check if item exists
    const isItemExist = (id) => items.some(item => item.id === id);

    // Computed values
    const basketTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    const contextValue = {
        items,
        getItems,
        getItem,
        addItem,
        removeItem,
        clearBasket,
        updateQuantity,
        basketTotal,
        itemCount,
        isItemExist
    };

    return (
        <BasketContext.Provider value={contextValue}>
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) throw new Error("useBasket must be used within BasketProvider");
    return context;
};
