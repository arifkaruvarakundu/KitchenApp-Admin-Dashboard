// react 
import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';    
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Landing from "./pages/landing";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import EditOrder from "./pages/EditOrder";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />}/>
            <Route path="/users" element={<Users />}/>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/products/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/categories/create-category" element={<CreateCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
            {/* Redirect to landing page if no match */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
