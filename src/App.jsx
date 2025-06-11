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
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
