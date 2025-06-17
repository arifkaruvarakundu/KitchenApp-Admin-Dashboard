// react 
import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';    
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import EditUser from "./pages/EditUser";
import SignIn from "./pages/SignIn";
import RegisterAdmin from "./pages/Register";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
        {/* Global Toast Container */}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          
          {/* Protected Routes */}
          <Route 
            path="/register" 
            element={
                <ProtectedRoute> 
                  <RegisterAdmin /> 
                </ProtectedRoute>} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/create-category"
            element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-category/:id"
            element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-order/:id"
            element={
              <ProtectedRoute>
                <EditOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
        </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
