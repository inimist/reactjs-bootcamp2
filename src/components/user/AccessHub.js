import React, { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './accesstyle.css';
import axios from 'axios';

function AccessHub({ setActivePage }) {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
   
    if (storedToken) {
      const accessToken = JSON.parse(storedToken);
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };

      axios.get('/user', config)
        .then((res) => {
          setActivePage('home');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleToggle = () => {
    setLoginPage(!loginPage);
  };


  return (
    <div className='container'>
      {loginPage ? (
        <Login handleToggle={handleToggle} setActivePage={setActivePage} />
      ) : (
        <Signup handleToggle={handleToggle} setActivePage={setActivePage} />
      )}


    </div>
  );
};

export default AccessHub;
