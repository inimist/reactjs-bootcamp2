import React, { useState } from 'react';
import './login.css'; // You can create a separate CSS file for styling
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const data = {
        'user': username,
        'password': password
    }

    const handleLogin = () => {
        console.log(username, password);
        if (username && password) {
            axios.post('/login', data).then((res) => {
                console.log(res.data)
            })
        } else {
            setError('Invalid username or password');
        }
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

            </div>
        </div>
    );
};

export default Login;
