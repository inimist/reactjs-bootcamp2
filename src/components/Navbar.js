import React from 'react';
import api from './user/api';

function Navbar({ setActivePage, userRole }) {
    const handleLogout = () => {

        api.post('/logout')
            .then((res) => {
                setActivePage('accessHub');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
            })
            .catch((error) => {
                console.error(error);
            });

    };

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
