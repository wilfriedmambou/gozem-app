import React, { useEffect, useState } from 'react';
import '../style/PackageList.css';

import { Link } from 'react-router-dom';

// import React from 'react';

const PackageList = ({ data }) => {
  console.log('data', data);
  const [packageinfos, setpackage] = useState('');
  useEffect(() => {
    setpackage(data);
  });

  return (
    <>
      <div className="package-list">
        <div className="package-list-titre">
          <h3>Package List </h3>
          {data.length > 0 && (
            <ul>
              {data.map((pack, index) => (
                <h4 key={index}>{pack.from_name}</h4>
              ))}
            </ul>
          )}
        </div>
        <div className="package-list-button">
          <Link to={`/new-package`} className="">
            <button type="button" className="btn btn-success home__cta">
              Create Package
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PackageList;
