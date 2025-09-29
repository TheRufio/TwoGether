import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }
    axios.post("http://127.0.0.1:8000/register/", {
      username,
      email,
      password1,
      password2
    })
    .then(() => {
      setUsername(""); setEmail(""); setPassword1(""); setPassword2("");
      alert("User registered!");
    })
    .catch((err) => {
      console.error(err);
      alert("Error registering user");
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Username" value={username}
               onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
               onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password1}
               onChange={e => setPassword1(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={password2}
               onChange={e => setPassword2(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
