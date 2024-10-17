import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]); // State to hold cart items

  // Function to add new products to the product list
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Function to add products to the cart
  const addToCart = (product) => {
    setCarts((prevCarts) => {
      const existingCart = prevCarts.find((cart) => cart.productId === product.id);
      if (existingCart) {
        return prevCarts.map((cart) =>
          cart.productId === product.id
            ? { ...cart, quantity: cart.quantity + 1 } // Increase quantity if product is already in the cart
            : cart
        );
      } else {
        return [
          ...prevCarts,
          { productId: product.id, product, quantity: 1 }, // Add new product to cart with quantity 1
        ];
      }
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, carts, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};
