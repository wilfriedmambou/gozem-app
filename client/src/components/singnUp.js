import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import auth from '../services/authService';
import * as userService from '../services/userService';
const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      name: UserName,
      email: Email,
      password: Password,
    };

    try {
      const response = await userService.register(body);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/login';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
        console.log(Error, 'EE%%%%%E');
      }
    }
  };

  return (
    <>
      <div className="new__delivery__body">
        <div className="center">
          <h1>Sing in </h1>
          <form onSubmit={handleSubmit}>
            <div className="new-package-section1">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="name"
                  className="name__input"
                  placeholder=" name"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
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
            <div className="">{Error && Error}</div>
            <button className="home__cta singup_validate_button">
              sing in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
