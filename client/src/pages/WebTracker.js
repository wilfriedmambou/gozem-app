import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMap from '../components/Map';
const WebTracker = ({ socket }) => {
  ////////

  const navigate = useNavigate();
  const [PackageId, setPackageId] = useState('');
  const [Package, setPackage] = useState('');
  const [Delivery, setDelivery] = useState('');
  const [BrowserLocation, setBrowserLocation] = useState('');
  const [ErrorPackage, setErrorPackage] = useState('');
  // const [browser_location, setBrowserLocation_lng] = useState('');
  socket.on('delivery_update', (payload) => {
    console.log('payload', payload.delivery_object);

    setDelivery(payload.delivery_object);
    // socket.removeAllListeners('delivery_update');
  });

  // console.log('handleTest', test);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(PackageId.length, 'length');
    if (PackageId.length < 8) return;

    try {
      console.log(PackageId, 'del///');
      const response = await fetch(
        'http://localhost:4000/api/package/' + PackageId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('delivery-result', result);

      if (result.active_delivery_id && result.active_delivery_id !== '') {
        try {
          const activity_delivery_response = await fetch(
            'http://localhost:4000/api/delivery/' + result.active_delivery_id,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
              'x-auth-token': localStorage.getItem('token'),
            }
          );

          const activity_delivery_result =
            await activity_delivery_response.json();

          console.log('MON TEST', activity_delivery_result);
          setDelivery(activity_delivery_result);

          socket.connect();

          // console.log('test---------');
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            setErrorPackage(ex.response.data);
            console.log(Error, 'EEEEE');
          } else if (ex.response && ex.response.status === 404) {
            setErrorPackage(ex.response.data);
          }
        }
        console.log('activity_existe');
      }
      console.log('result is: ', JSON.stringify(result, null, 4));
      localStorage.setItem('Package', result);

      setPackage(result);
    } catch (ex) {
      console.log(ex, 'ex');
      if (ex.response && ex.response.status === 404) {
        setErrorPackage(ex.response.data);
        console.log(ex.response.data, 'EEEEE11');
      } else if (ex.response && ex.response.status === 404) {
        setErrorPackage(ex.response.data);
        console.log(ex.response.data, 'EEEEE11');
      }
    }
  };

  // useEffect(() => {
  //   fetchDeliveryData();
  // }, []);
  return (
    <>
      <div className="parent-container">
        <form className="home__container" onSubmit={handleSubmit}>
          <h2 className="home__header">Web Tracker</h2>
          <label htmlFor="username">Package Id</label>
          <div className="container-input-button">
            <input
              type="text"
              minLength={16}
              id="username"
              className="package__input package__user"
              placeholder="Enter Package Id"
              onChange={(event) => {
                setPackageId(event.target.value);
              }}
            />
            <button className="home__cta package_validate_button">Track</button>
          </div>
        </form>
        <div>{ErrorPackage && ErrorPackage}</div>
        <div className="container-map-package-delivery">
          <div className="package-delivery-infos">
            <div className="delivery_Detail">
              <h4>Delivery Detail</h4>
              {!Delivery && 'no delivery at the moment'}
              <h6>{Delivery && Delivery.pickup_time}</h6>
              <h6>{Delivery && Delivery.location.lat}</h6>
              <h6>{Delivery && Delivery.location.lng}</h6>
              <h6>{Delivery && Delivery.status}</h6>
              {/* <h6>{Delivery &&()}</h6> */}
            </div>

            <div className="package_Detail">
              <h2>Package_Detail</h2>
              {!Package && 'no Package at the moment'}
              <h6>{Package ? Package.description : ''}</h6>
              <h6>{Package && Package.from_name}</h6>
              {/* <h6>Package &&({Package.from_location.lat})</h6> */}
              {/* <h6>Package &&({Package.from_location.lng})</h6> */}
              <h6></h6>
            </div>
          </div>
          <div className="map">
            <HomeMap
              marker_lat={Delivery !== '' ? Delivery.location.lat : 0}
              marker_lng={Delivery !== '' ? Delivery.location.lng : 0}
              package_from_lat={Package !== '' ? Package.from_location.lat : 0}
              package_from_lng={Package !== '' ? Package.from_location.lng : 0}
              package_to_lat={Package !== '' ? Package.to_location.lat : 0}
              package_to_lng={Package !== '' ? Package.to_location.lng : 0}
              browser_location_lng={
                BrowserLocation !== '' ? BrowserLocation.lng : 0
              }
              browser_location_lat={
                BrowserLocation !== '' ? BrowserLocation.lat : 0
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WebTracker;
