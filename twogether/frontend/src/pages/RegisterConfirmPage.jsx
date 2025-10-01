import React, {useState} from "react"
import axios from "axios";
import {Link, useNavigate, useLocation} from "react-router-dom"
import "../css/authenticate.css";

function RegisterConfirmPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const confirmRegistration = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:8000/register/confirm/", { email, code });
        console.log(response.data); 
        navigate("/users");
    } catch (err) {
        console.log(err.response?.data);
        if (err.response?.data?.code) {
        setError(err.response.data.code[0]);
        } else {
        setError("Something went wrong");
        }
    }
    };



    return (
        <div>
            <form onSubmit={confirmRegistration}>
                <input type="number" placeholder="Verification code" value={code}
                    onChange={event => setCode(event.target.value)}/>
                <input type="submit"/>
            </form>

        </div>
    )
}

export default RegisterConfirmPage