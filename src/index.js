import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

import "./styles/index.css";

// Получаем корневой элемент
const container = document.getElementById("root");

// Создаём корень
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
