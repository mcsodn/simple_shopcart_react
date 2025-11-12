import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { getSizes, getProducts } from "./services/api";

import Header from "./components/Header/Header.jsx";
import Cart from "./pages/CartPage/CartPageElement.jsx";
import ShopPageElement from "./pages/ShopPageElement/ShopPageElement.jsx";
import ProductPageElement from "./pages/ProductPageElement/ProductPageElement.jsx";

export default function App() {
  const [productsState, setProductsState] = useState({
    products: [],
    loading: true,
    error: null,
  });

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

  if (productsState.error) return <div>Ошибка загрузки товара</div>;

  return (
    <div className="App">
      <Router>
        <Header />
        {productsState.loading ? (
          <div>Загрузка...</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<ShopPageElement products={productsState.products} />}
            />
            <Route path="/product/:id" element={<ProductPageElement />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}
