import React, { createContext, useState, useEffect } from "react";
import api from "./api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const res = await api.post("auth/login/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setUser({ username }); // можно дополнительно грузить профиль
  }

  async function register(username, email, password) {
    await api.post("auth/register/", { username, email, password });
    // сразу логиним после регистрации
    await login(username, password);
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      // для простоты сохраним только username
      setUser({ username: "..." });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}