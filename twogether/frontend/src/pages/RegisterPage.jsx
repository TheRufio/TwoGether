import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/authenticate.css"

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/register/request/", {
        username, email, password1, password2
      });
      navigate("/register/confirm", { state: { email } }); 
    } catch (err) {
      if (err.response?.data){
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_error: [err.message]})
      }}
  };

  const openPasswordField = (event) => {
    event.preventDefault();
    setOpenPassword(!openPassword);
  }

  return (
    <div className="page-container">
      <nav>
        <b>Registration</b>
        <i>{'➤'}</i>
        <Link to="/users">Users</Link>
        <i>{'➤'}</i>
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
          {errors.email && <div className="error">{errors.email[0]}</div>}
        </form>
      </div>
      <footer>
        TwoGether website ©
      </footer>
    </div>
  )
}

export default RegisterPage