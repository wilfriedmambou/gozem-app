// import React, { useState } from 'react';
import { useState, useEffect } from 'react';
import DeliveryList from '../components/DeliveryList';
import PackageList from '../components/PackageList';
import '../style/Admin.css';
// import React from 'react';

const Admin = () => {
  const [Packagedata, setPackageData] = useState([]);
  const [Deliverydata, setDeliveryData] = useState([]);

  console.log('Delivery', Deliverydata);
  console.log('Packagedata', Packagedata);
  const fetchPackageList = () => {
    fetch('http://localhost:4000/package/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPackageData(data);
      });
  };
  const fetchDeliveryList = () => {
    fetch('http://localhost:4000/delivery/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDeliveryData(data);
      });
  };

  useEffect(() => {
    fetchPackageList();
    fetchDeliveryList();
  }, []);
  return (
    <>
      <h2 className="admin-title">Web Admin - Home</h2>
      <div className="container ">
        <div className="panel">
          <PackageList data={Packagedata} />
          <DeliveryList data={Deliverydata} />
        </div>
        <div className="side-bar"></div>
      </div>
    </>
  );
};

export default Admin;
