import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./admin/Products";
import ProductsCreate from "./admin/ProductsCreate";
import ProductsEdit from "./admin/ProductsEdit";
import "./App.css";
import Main from "./main/Main";


function App() {
  return (
    <div className="App">

 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/create" element={<ProductsCreate />} />
              <Route path="/admin/products/:id/edit" element={<ProductsEdit />} />
            </Routes>
          </BrowserRouter>

    </div>
  );
}

export default App;
