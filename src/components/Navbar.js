import React from 'react';
import axios from 'axios';

function Navbar({ setActivePage, userRole }) {
    const handleLogout = () => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const accessToken = JSON.parse(storedToken);
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            axios.post('/logout', {}, config)
                .then((res) => {
                    setActivePage('accessHub');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userRole');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
console.log(userRole);
    return (
        <div className="navbar">
            <h1>Quiz</h1>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <ul className="navbar-nav">
                    <li onClick={() => setActivePage('home')} className="nav-item">Home</li>
                    {userRole == 'admin' ? <li onClick={() => setActivePage('questionBank')} className="nav-item">Question Bank</li> : ""}
                    <li onClick={() => setActivePage('about')} className="nav-item">About</li>
                    <li onClick={handleLogout} className="nav-item">Logout</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
