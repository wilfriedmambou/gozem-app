import React, { useState } from 'react';
import imgLanding from '../images/home.png';
import '../style/Home.css';
const Home = ({ socket }) => {
  return (
    <>
      <div className="containter__home">
        <img className="home__img" src={imgLanding}></img>
      </div>
    </>
  );
};

export default Home;
