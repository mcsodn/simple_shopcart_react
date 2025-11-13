import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { getProducts } from "./services/api";
import {
  productCartReducer,
  productsInCartInit,
} from "./services/productCartReduser";

import Header from "./components/Header/Header.jsx";
import CartPageElement from "./pages/CartPageElement/CartPageElement.jsx";
import ShopPageElement from "./pages/ShopPageElement/ShopPageElement.jsx";
import ProductPageElement from "./pages/ProductPageElement/ProductPageElement.jsx";

export default function App() {
  // Стейт данных
  const [productsState, setProductsState] = useState({
    products: [],
    loading: true,
    error: null,
  });

  // Получение данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await getProducts();
        setProductsState((prevState) => {
          return { ...prevState, products: dataProducts };
        });
      } catch (error) {
        setProductsState((prevState) => {
          return { ...prevState, error: error, loading: false };
        });
      } finally {
        setProductsState((prevState) => {
          return { ...prevState, loading: false };
        });
      }
    };

    fetchData();
  }, []);

  const [productsInCart, dispatch] = useReducer(
    productCartReducer,
    productsInCartInit
  );

  if (productsState.error) return <div>Ошибка загрузки товара</div>;

  return (
    <div className="App">
      <Router>
        <Header cartTotal={productsInCart.total} />
        {productsState.loading ? (
          <div>Загрузка...</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<ShopPageElement products={productsState.products} />}
            />
            <Route
              path="/product/:id"
              element={<ProductPageElement dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={
                <CartPageElement
                  dispatch={dispatch}
                  cartItems={productsInCart.items}
                />
              }
            />
          </Routes>
        )}
      </Router>
    </div>
  );
}
