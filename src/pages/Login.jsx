//Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3002/", {
                email: email,
                password: password
            });

            if (response.data === "exist") {
                login({ email }); // Update the user state in AuthContext
            } else if (response.data === "notexist") {
                alert("Invalid email or password");
            }
            
        } catch (error) {
            alert("Wrong details");
            console.error(error);
        }
    }

    return (
        <div className="container">
            <div className="wrapper signIn">
                <div className="form">
                    <div className="heading">LOGIN</div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
