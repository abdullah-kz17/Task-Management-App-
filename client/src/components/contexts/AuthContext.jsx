import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import { login, register } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      message.success("Logged in successfully");
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const data = await register(name, email, password);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      message.success("Registered successfully");
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    message.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
