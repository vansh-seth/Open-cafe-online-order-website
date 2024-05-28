import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
    const navigate = useNavigate(); 
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    function handleClick(event) {
        event.preventDefault();
        const newSchema = {
          name: input.name,
          password: input.password,
          email: input.email,
        };
      
        axios
          .post('http://localhost:3002/Signup', newSchema)
          .then(res => {
            if (res.data === "exist") {
              alert("User already exists");
            } else if (res.data === "notexist") {
              alert("Signup successful");
              navigate('/login'); 
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    };

    return (
        <div className="container">
            <div className="wrapper signUp">
                <div className="form">
                    <div className="heading">CREATE AN ACCOUNT</div>
                    <form onSubmit={handleClick}>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Enter your name" value={input.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email">E-Mail</label>
                            <input type="email" name="email" placeholder="Enter your email" value={input.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Enter your password" value={input.password} onChange={handleChange} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <div align="center" className="or">OR</div>
                    <p>
                        Have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
