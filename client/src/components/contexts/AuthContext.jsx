import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, register } from "../services/api";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set the authorization token in axios headers
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const isLoggedIn = !!token;

  // Function to store token in localStorage and update state
  const storeTokenInLs = (storeToken) => {
    localStorage.setItem("token", storeToken); // Store the new token
    setToken(storeToken); // Update state with the new token
    message.success("Logged in successfully");
    axios.defaults.headers.common["Authorization"] = `Bearer ${storeToken}`; // Update axios header
  };

  // Fetch current user data
  const getCurrUserData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/auth/user");
      setUser(res.data); // Assuming `res.data` has a `user` property
      console.log("Current User Data", res.data);
    } catch (error) {
      console.error("Failed to fetch current user data:", error);
      message.error("Failed to fetch current user data.");
    }
  };

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      storeTokenInLs(data.token); // Store token received from login
      setUser(data.user); // Assuming `data` has a `user` property
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      storeTokenInLs(data.token); // Store token received from registration
      setUser(data.user); // Assuming `data` has a `user` property
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token on logout
    delete axios.defaults.headers.common["Authorization"]; // Remove authorization header
    message.success("Logged out successfully");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getCurrUserData(); // Fetch current user data if logged in
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
