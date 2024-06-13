import React, { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './accesstyle.css';
import api from './api.js';

function AccessHub({ setActivePage }) {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
      api.get('/user')
        .then((res) => {
          setActivePage('home');
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    
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
