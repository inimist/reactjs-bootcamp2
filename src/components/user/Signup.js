// Signup.js

import axios from 'axios';
import React, { useState } from 'react';

const Signup = ({ handleToggle, setActivePage }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/signup', formData).then((res) => {
            if (res.data == 'invalid credential') {
                setError('Invalid username or password');
            } else {
                const userId = res.data.userId;
                const token = res.data.token;
                localStorage.setItem('userId', JSON.stringify(userId));
                localStorage.setItem('token', JSON.stringify(token));
                setActivePage('home'); 
            }
        }).catch(function (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        });
        // Handle the signup logic (e.g., send a request to your API)
    };

    const cursorPointer = {
        cursor: 'pointer'
        // Add more styles as needed
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Create an Account</h2>
                <span className='text-danger'>{error}</span>
                <form className="signup-form" onSubmit={(e) => handleSubmit(e, formData)}>
                    <div className="input-group">
                        <label htmlFor="name" className='logLabel'>Name:</label>
                        <input className='logInput' type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className='logLabel'>Email:</label>
                        <input className='logInput' type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className='logLabel'>Password:</label>
                        <input className='logInput' type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className='logBtn'>Sign Up</button>
                </form>
                <p>Already have an account?<span className='text-primary ' style={cursorPointer} onClick={handleToggle}> Login</span> </p>
            </div>
        </div>
    );
};

export default Signup;
