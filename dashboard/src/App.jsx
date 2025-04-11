import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  useEffect(() => {
    // Check if admin is already logged in from localStorage
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    
    // Set initial state based on localStorage
    if (isAdminLoggedIn) {
      setIsAuthenticated(true);
    }
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        
        if (response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
          localStorage.setItem("isAdminLoggedIn", "true");
        }
      } catch (error) {
        console.log("Auth check failed:", error.message);
        setIsAuthenticated(false);
        setUser({});
        localStorage.removeItem("isAdminLoggedIn");
      }
    };
    
    // If there's a stored login state, verify with the backend
    if (isAdminLoggedIn) {
      fetchUser();
    }
  }, []); 
  
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/doctor/addnew" 
          element={isAuthenticated ? <AddNewDoctor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/addnew" 
          element={isAuthenticated ? <AddNewAdmin /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/messages" 
          element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/doctors" 
          element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />} 
        />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;