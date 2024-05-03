import React, { useState, createContext, ReactNode, useEffect } from 'react';
import Product from './Product';

interface ContextType {
  cartItemsNumber: number;
  setCartItemsNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const Context = createContext<ContextType>({
  cartItemsNumber: 0,
  setCartItemsNumber: () => {} 
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [cartItemsNumber, setCartItemsNumber] = useState<number>(0);
  
    useEffect(() => {
      const localStorageCart = localStorage.getItem('wantedProducts');
      if (localStorageCart) {
        const parsedCart = JSON.parse(localStorageCart);
        const totalItems = parsedCart.reduce((acc: number, item: Product) => acc + item.quantity, 0);
        setCartItemsNumber(totalItems);
      }
    }, []);
  
    return (
      <Context.Provider value={{ cartItemsNumber, setCartItemsNumber }}>
        {children}
      </Context.Provider>
    );
  };
  
