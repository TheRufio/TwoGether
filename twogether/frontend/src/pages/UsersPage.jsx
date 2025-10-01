import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <nav>
        <Link to="/register">Registration</Link>
      </nav>
      <h1>Users</h1>
      <ul>
        {users.map(u => 
        <li key={u.id}>
          {u.username} - {u.email}
        </li>
        )}
      </ul>
    </div>
  );
}

export default UsersPage;
