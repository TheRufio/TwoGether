import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterConfirmPage from "./pages/RegisterConfirmPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/register/request" element={<RegisterPage />} />
        <Route path="/register/confirm" element={<RegisterConfirmPage />} />
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
