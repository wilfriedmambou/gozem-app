import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import WebTracker from './pages/WebTracker';
import socketIO from 'socket.io-client';
// import WebTracker from './pages/WebTracker';
import Admin from './pages/Admin';
import NewPackage from './pages/NewPackage';
import NewDelivery from './pages/NewDelivery';
import WebDriver from './pages/WebDriver';
import Header from './components/Header';
import SingnUp from './components/singnUp';
import Login from './components/Login';
import Home from './components/Home';
import auth from './services/authService';

const socket = socketIO.connect('http://localhost:4000');
function App() {
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Header socket={socket} user={user} />
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/register" element={<SingnUp socket={socket} />}></Route>
          <Route path="/login" element={<Login socket={socket} />}></Route>

          <Route
            path="/web-tracker"
            element={<WebTracker socket={socket} />}
          ></Route>
          <Route
            path="/web-driver"
            element={<WebDriver socket={socket} />}
          ></Route>

          <Route path="/admin" element={<Admin socket={socket} />}></Route>
          <Route
            path="/new-package"
            element={<NewPackage socket={socket} />}
          ></Route>
          <Route
            path="/new-delivery"
            element={<NewDelivery socket={socket} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
