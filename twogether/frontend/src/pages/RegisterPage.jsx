import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../css/authenticate.css"

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [openPassword, setOpenPassword] = useState(false);

  const handleAddUser = (event) => {
    event.preventDefault();
  
    if (password1 !== password2){
      alert("Password do not match");
      return
    }

    axios.post("http://127.0.0.1:8000/register/",{
    username,
    email,
    password1,
    password2
  })
  .then(() => {
    setUsername(""); setEmail(""); setPassword1(""); setPassword2("");
    alert("User has registered")
  })
  };

  const openPasswordField = (event) => {
    event.preventDefault();
    setOpenPassword(!openPassword);
  }

  return (
    <div className="page-container">
      <nav>
        <Link to="/users">Users</Link>
        <b>Users</b>
        <Link to="/users">Users</Link>
      </nav>
      <div className="main-container">
        <form onSubmit={handleAddUser}>
          <label>Username</label>
          <input type="text" placeholder="Name"as value={username}
            onChange={event => setUsername(event.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder="somemail@mail.com" value={email}
            onChange={event => setEmail(event.target.value)}/>
          <label>Password</label>
          <input type={openPassword ? "text " : "password"} placeholder="*****" value={password1}
            onChange={event => setPassword1(event.target.value)}/>
          <label>Confirm Password</label>
          <input type={openPassword ? "text" : "password"} placeholder="*****" value={password2}
            onChange={event => setPassword2(event.target.value)}/>
          <div className="buttons">
            <input type="button" onClick={openPasswordField} value="👀"/>
            <input type="submit" value="Register"/>
          </div>

        </form>
      </div>
      <footer>
        TwoGether website ©
      </footer>
    </div>
  )
}

export default RegisterPage