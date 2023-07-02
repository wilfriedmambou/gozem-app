import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NewDelivery.css';
const NewDelivery = ({ socket }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [fromLocationLng, setFromLocationLng] = useState('');
  const [fromLocationLat, setFromLocationLat] = useState('');
  const [toName, setToName] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [toAocationLat, setToLocationLat] = useState('');
  const [toAocationLng, setToLocationLng] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      description: description,
      active_delivery_id: '',
      weight: width,
      height: height,
      depth: depth,
      from_name: fromName,
      from_address: fromAddress,
      from_location: {
        lat: fromLocationLat,
        lng: fromLocationLng,
      },
      to_name: toName,
      to_address: toAddress,
      to_location: {
        lat: toAocationLat,
        lng: toAocationLng,
      },
    };

    try {
      const response = await fetch('http://localhost:4000/api/package/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  // useEffect(() => {
  //   fetchDeliveryData();
  // }, []);
  return (
    <>
      <div className="new__delivery__body">
        <div className="center">
          <h1>New Package</h1>
          <form onSubmit={handleSubmit}>
            <div className="new-package-section1">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="description"
                  className="description__input "
                  placeholder="Enter Description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="width"
                  className="width__input"
                  placeholder="Enter Width"
                  onChange={(event) => {
                    setWidth(event.target.value);
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
                  id="height"
                  className="height__input"
                  placeholder="Enter Height"
                  onChange={(event) => {
                    setHeight(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="depth"
                  className="depth"
                  placeholder="Enter depth"
                  onChange={(event) => {
                    setDepth(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="new-package-section3">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="from_name"
                  className="from__name__input"
                  placeholder="Enter from name"
                  onChange={(event) => {
                    setFromName(event.target.value);
                  }}
                />
              </div>

              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="to_name"
                  className="to__name__input"
                  placeholder="Enter To Name"
                  onChange={(event) => {
                    setToName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="new-package-section4">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="from__adress"
                  className="from__adress"
                  placeholder="From Adress"
                  onChange={(event) => {
                    setFromAddress(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="to__address"
                  className="to__adress"
                  placeholder="Enter to Adress"
                  onChange={(event) => {
                    setToAddress(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="new-package-section5">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="from__location__lat"
                  className="from__location__lat"
                  placeholder="Enter from location Lat"
                  onChange={(event) => {
                    setFromLocationLat(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="from__location__lng"
                  className="from__location__lng"
                  placeholder="Enter from location Lng"
                  onChange={(event) => {
                    setFromLocationLng(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="new-package-section6">
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="to__location__lat"
                  className="to__location__lat"
                  placeholder="Enter To location Lat"
                  onChange={(event) => {
                    setToLocationLat(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="to__location__lng"
                  className="to__location__lng"
                  placeholder="Enter To location Lng"
                  onChange={(event) => {
                    setToLocationLng(event.target.value);
                  }}
                />
              </div>
            </div>
            <button className="home__cta package_validate_button">
              Add Package
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDelivery;

// delivery_id: 649392b94039e5e2b3e9099b
// package_id:  6494a563c76ec54415defbe0
