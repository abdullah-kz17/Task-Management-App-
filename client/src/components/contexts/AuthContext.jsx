import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, register } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const authorizationToken = `Bearer ${token}`;

  // Function to store token in localStorage and update state
  const storeTokenInLs = (storeToken) => {
    localStorage.setItem("token", storeToken); // Store the new token
    setToken(storeToken); // Update state with the new token
    message.success("Logged in successfully");
    return true;
  };

  const isLoggedIn = !!token;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data.user); // Assuming `data` has a `user` property
      storeTokenInLs(data.token); // Store token received from login

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
      setUser(data.user); // Assuming `data` has a `user` property
      storeTokenInLs(data.token); // Store token received from registration
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
    message.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        logout,
        authorizationToken,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
