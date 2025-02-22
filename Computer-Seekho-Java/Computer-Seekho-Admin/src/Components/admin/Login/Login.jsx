import React, { useState } from "react";
import LoginImage from "../../../assets/img/home/home3.png";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const inputChangeHandler = (field, value) => {
        if (field === "username") {
            setUsername(value);
        } else if (field === "password") {
            setPassword(value);
        }
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8080/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + btoa(username + ":" + password)
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    toast.error("Invalid credentials..!", { position: "top-center" });
                }
                 else {
                    toast.error("Internal server error", { position: "top-center" });
                }
            } else {
                const data = response.headers.get('Authorization');
                sessionStorage.setItem('token', data);
                const data2 = await response.json();
                navigate("/admin/enquiry");
                toast.success(data2.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <section id="login" className="login-container">
            <Toaster />
            <div className="login-image-container">
                <img className="login-image" src={LoginImage} alt="Login" />
            </div>
            <div className="login-form-container">
                <h2 className="login-title">
                    Login to <span className="highlight">VITA</span>
                </h2>
                <form className="login-form" onSubmit={loginHandler}>
                    <div className="input-group">
                        <input
                            type="text"
                            required
                            onChange={(e) => inputChangeHandler("username", e.target.value)}
                            value={username}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            required
                            onChange={(e) => inputChangeHandler("password", e.target.value)}
                            value={password}
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <button type="submit" className="login-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;