import React, { useState, useEffect } from 'react';
import LogoImage from '../images/gozem-logo.png';
import '../style/Header.css';
import { useNavigate, Link } from 'react-router-dom';
// var jwt = require('jsonwebtoken');

const Header = ({ socket, user }) => {
  const [urltes, setUrl] = useState('');
  const [token, setToken] = useState('');
  console.log(user, 'User');
  // const [decoded, setdecoded] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setUrl('http://localhost:3000/login');
    localStorage.getItem('token')
      ? setToken(localStorage.getItem('token'))
      : setToken('');
  }, []);
  // console.log(decoded, 'decoded');x
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };
  console.log('token', token);
  return (
    <div className="header__container">
      <div className="logo__container">
        <img className="logo" src={LogoImage} />
      </div>

      <div className="container__link">
        {user && user.isAdmin && (
          <React.Fragment>
            <Link className="header__item" to={`/admin`}>
              <div className=" web__Admin ">Web Admin </div>
            </Link>

            <Link className="header__item" to={`/new-package`}>
              <div className=" web__admin__package">New Package</div>
            </Link>

            <Link className="header__item" to={`/new-delivery`}>
              <div className=" web__admin__delivery">New Delivery</div>
            </Link>
          </React.Fragment>
        )}

        {!user && (
          <React.Fragment>
            <Link className="header__item" to={`/login`}>
              Login
            </Link>
            <Link className="header__item" to={`/register`}>
              Register
            </Link>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <Link className="header__item" to={`/web-tracker`}>
              <div className=" web__tracker">Web Tracker</div>
            </Link>
            <Link className="header__item" to={`/web-driver`}>
              <div className=" web__driver">Web Driver</div>
            </Link>

            <Link className="header__item" to={`/login`} onClick={handleLogOut}>
              <div className=" web__admin__delivery">log out</div>
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
