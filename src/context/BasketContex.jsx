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
        console.log('item',items)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const getItems = () => items;

    const getItem = (itemId) => items.find((item) => item.id === itemId);

    const addExtraToItem = (itemId, extraItem) => {

        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id !== itemId) return item;

                const extras = item.extra || [];
                // Check if extra already exists
                const existingExtra = extras.find(e => e.id === extraItem.id);
                if (!existingExtra) {
                    return { ...item, extra: [...extras, { ...extraItem,quantity:1 }] };
                }
                return item;
            });
        });
    };

    const removeExtraFromItem = (itemId, extraId) => {

        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id !== itemId) return item;
                const extras = item.extra || [];
                const newExtras = extras.filter(e => String(e.id) !== String(extraId.id));

                if (newExtras.length === extras.length) {
                    return item;
                }

                return { ...item, extra: newExtras };
            });
        });
    };

    const addItem = (newItem) => {
        setItems((currentItems) => {
            return [...currentItems, { ...newItem }];
        });
    };

    const removeItem = (itemId) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    };

    const clearBasket = () => {
        setItems([]);
    };

    const updateQuantity = (itemId, newQuantity) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item
            )
        );
    };

    const updateQuantityItemExtra = (basketItem, extraId, newQuantity) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id !== basketItem.id) return item;

                const updatedExtras = (item.extra || []).map((extra) =>
                    extra.id === extraId ? { ...extra, quantity: Math.max(0, newQuantity) } : extra
                );


                return { ...item, extra: updatedExtras };
            })
        );
    };

    const isExtraSelected = (itemId, extraId) => {
        const item = items.find(i => i.id === itemId);
        if (!item || !item.extra) return false;
        return item.extra.some(e => String(e.id) === String(extraId));
    };

    const isItemExist = (id) => items.some((item) => item.id === id);

    const getExtraById = (item, extraItemId) => {
        if (!item || !item.extra) return undefined;
        const basketItem =  getItem(item.id)

        basketItem.extra.map(console.log)


        return getItem(item.id).extra.find(extra =>extra.id === extraItemId);
    };

    const getItemTotal = (item) => {
        const itemTotal = item.price * item.quantity;
        const extrasTotal = (item.extra || []).reduce((total, extra) =>
            total + (extra.price * (extra.quantity || 1)), 0
        );
        return (itemTotal + extrasTotal) * item.quantity;
    };

    // Computed values
    const basketTotal = items.reduce((total, item) => total + getItemTotal(item), 0);
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
        removeExtraFromItem,
        updateQuantityItemExtra,
        getExtraById,
        getItemTotal
    };

    return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) throw new Error("useBasket must be used within BasketProvider");
    return context;
};
