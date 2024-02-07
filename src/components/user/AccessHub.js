import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './accesstyle.css';

function AccessHub({ setActivePage }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };


  return (
    <div className='container'>
      {isLogin ? (
        <Login handleToggle={handleToggle} setActivePage={setActivePage} />
      ) : (
        <Signup handleToggle={handleToggle} setActivePage={setActivePage} />
      )}


    </div>
  );
};

export default AccessHub;
