import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/authService';
import '../style/Login.css';
// import Joi from 'joi-browser';

const Login = ({ socket }) => {
  const navigate = useNavigate();
  // const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorEmail, setErrorEmail] = useState('');
  const [ErrorPass, setErrorPass] = useState('');
  var urlcourante = document.location.href;

  console.log(urlcourante);
  console.log(window.location.href === 'http://localhost:3000/api/login');
  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      // name: UserName,
      email: Email,
      password: Password,
    };

    try {
      await auth.login(body.email, body.password);

      navigate('/web-tracker');
      window.location.reload();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrorEmail(ex.response.data);
        console.log(ErrorEmail, 'EEEEE');
      }
    }
  };

  return (
    <>
      <div className="new__delivery__body">
        <div className="center">
          <h1>Login </h1>
          <form onSubmit={handleSubmit}>
            <div className="new-package-section1">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="email"
                  className="email__input"
                  placeholder="Email "
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="new-package-section2">
                <div className="inputbox">
                  <input
                    type="text"
                    required="required"
                    minLength={2}
                    id="password"
                    className="password__input"
                    placeholder="Enter password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={Error === '' ? `Error` : ''}>
              {ErrorEmail && ErrorEmail}
            </div>
            <button className="home__cta login_validate_button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
