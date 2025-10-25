import React, { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

const LOCAL_STORAGE_KEY = "basket_items";

export function BasketProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const getItems = () => items;

    const getItem = (itemId) => items.find((item) => item.id === itemId);

    function addExtraToItem(itemId, extraItem) {
        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id !== itemId) return item;

                const extras = item.extras || [];
                // Only add if not already present
                if (!extras.find(e => e.id === extraItem.id)) {
                    return { ...item, extras: [...extras, extraItem] };
                }
                return item;
            });
        });
    }

    function removeExtraFromItem(itemId, extraId) {
        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id !== itemId) return item;

                const extras = item.extras || [];
                // Remove the extra if it exists
                const newExtras = extras.filter(e => e.id !== extraId);

                return { ...item, extras: newExtras };
            });
        });
    }

    const addItem = (newItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === newItem.id);
            if (!existingItem)
                return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];
            return currentItems.map((item) =>
                item.id === newItem.id
                    ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                    : item
            );
        });
    };

    const removeItem = (itemId) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    };

    const clearBasket = () => setItems([]);

    const updateQuantity = (itemId, newQuantity) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const isExtraSelected = (itemId, extraId) => {
        const item = items.find(i => i.id === itemId);
        if (!item || !item.extras) return false;
        return item.extras.some(e => e.id === extraId);
    };

    const isItemExist = (id) => items.some((item) => item.id === id);

    // Computed values
    const basketTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
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
        isItemExist,
        isExtraSelected,
        addExtraToItem,
        removeExtraFromItem
    };

    return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) throw new Error("useBasket must be used within BasketProvider");
    return context;
};
