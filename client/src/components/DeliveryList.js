import React, { useEffect, useState } from 'react';
import '../style/DeliveryList.css';
import { Link } from 'react-router-dom';
// import React from 'react';

const DeliveryList = ({ data }) => {
  console.log('data', data);
  const [deliveryinfos, setdelivery] = useState('');
  useEffect(() => {
    setdelivery(data);
  });

  return (
    <>
      <div className="delivery-list">
        <div className="delivery-list-titre">
          <h3>delivery List </h3>
          {data.length > 0 && (
            <ul>
              {data.map((deli, index) => (
                <li key={index}>{deli._id}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="delivery-list-button">
          <Link to={`/new-delivery`} className="">
            <button type="button" className="btn btn-success home__cta">
              Create delivery
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DeliveryList;
