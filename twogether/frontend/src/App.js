import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/users">Users</Link> | <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<UsersPage />} /> {/* опционально: корень → users */}
      </Routes>
    </Router>
  );
}

export default App;
