import React, { useState } from 'react';
import axios from 'axios';

function Login({ handleToggle, setActivePage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const data = {
        'email': username,
        'password': password
    }

    const handleLogin = () => {

        if (username && password) {
            axios.post('/login', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                
                if (res.data == 'invalid credential') {
                    setError('Invalid username or password');
                } else {
                    setActivePage('home');
                    const obj = res.data.userId;
                    localStorage.setItem('userId', JSON.stringify(obj));
                }
            })
        } else {
            setError('Invalid username or password');
        }
    };

    const cursorPointer = {
        cursor: 'pointer'
        // Add more styles as needed
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Login</h2>
                <div className="input-group">
                    <label className='logLabel' htmlFor="username">Username</label>
                    <input
                        className='logInput'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className='logLabel' htmlFor="password">Password</label>
                    <input
                        className='logInput'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className='logBtn' onClick={handleLogin}>Login</button>
                <p>Don't have Account <span className='text-primary ' style={cursorPointer} onClick={handleToggle}>Signup!</span></p>

            </div>
        </div>
    );
};

export default Login;
