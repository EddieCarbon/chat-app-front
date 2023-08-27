import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";


export default function LoginPage({ setupSocket }) {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        axios.post('http://localhost:8000/user/login', {
            email,
            password
        }).then((response) => {
            makeToast("success", response.data.message);
            localStorage.setItem("CC_Token",`${response.data.token}`);
            console.log(localStorage.getItem("CC_Token"));
            navigate('/dashboard');
            setupSocket();
        }).catch((err) => {
        if (err &&
            err.response &&
            err.response.data &&
            err.response.data.message
        ) makeToast("error", err.response.data.message);
        });
    };

    return ( 
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="abc@example.com" ref={emailRef}/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef}/>
                </div>
            </div>
            <button onClick={loginUser}>Login</button>
        </div>
    );
}

