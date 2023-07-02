import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeMap from '../components/Map';
import '../style/WebDriver.css';
const WebDriver = ({ socket }) => {
  const navigate = useNavigate();
  const [DeliveryId, setDeliveryId] = useState('');
  const [Package, setPackage] = useState('');
  const [Delivery, setDelivery] = useState('');
  const [BrowserLocationLat, setBrowserLocationLat] = useState('');
  const [BrowserLocationLng, setBrowserLocationLng] = useState('');
  const [openStatus, setOpenStatus] = useState('');

  socket.on('status_changed', (payload) => {
    console.log('payload', payload.delivery_object);

    setDelivery((deli) => {
      return {
        ...deli,
        status: payload.status,
      };
    });

    console.log(Delivery, 'onstatus_changed');
  });

  socket.on('location_changed', (payload) => {
    console.log(' location_change_payload', payload);

    setDelivery((deli) => {
      return {
        ...deli,
        location: {
          lat: payload.location.lat,
          lng: payload.location.lng,
        },
      };
    });

    console.log(Delivery, 'location_changed');
  });
  const handlePickup = async (e) => {
    e.preventDefault();
    console.log('Pickup Delivery', Delivery);
    if (Delivery && Delivery.status === 'open') {
      console.log('Pickup Delivery OPEN', Delivery);
      socket.emit('status_changed', {
        event: 'status_change',
        delivery_id: DeliveryId,
        status: 'picked-up',
      });
    }
  };

  const handleInTransit = async (e) => {
    e.preventDefault();
    console.log('Pickup Delivery', Delivery);
    if (Delivery && Delivery.status === 'picked-up') {
      console.log('Pickup Delivery Pickup', Delivery);
      socket.emit('status_changed', {
        event: 'status_change',
        delivery_id: DeliveryId,
        status: 'in-transit',
      });
    }
  };
  const handleDelivered = async (e) => {
    e.preventDefault();
    console.log('Delivered', Delivery);
    if (Delivery) {
      console.log('Delivered Delivery Delivered', Delivery);
      socket.emit('status_changed', {
        event: 'status_change',
        delivery_id: DeliveryId,
        status: 'delivered',
      });
    }
  };

  const handleFailed = async (e) => {
    e.preventDefault();
    console.log('Delivered  Failed', Delivery);
    if (Delivery) {
      console.log('Delivered Delivery Failed', Delivery);
      socket.emit('status_changed', {
        event: 'status_change',
        delivery_id: DeliveryId,
        status: 'failed',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setDeliveryId(e.target.value);

    try {
      // console.log(Delivery, 'del///');
      const response = await fetch(
        'http://localhost:4000/api/delivery/' + DeliveryId,
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

      if (result.package_id && result.package_id !== '') {
        try {
          const package_on_delivery = await fetch(
            'http://localhost:4000/api/package/' + result.package_id,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'x-auth-token': localStorage.getItem('token'),
              },
            }
          );

          const package_on_delivery_result = await package_on_delivery.json();
          console.log(package_on_delivery_result, 'test_package');
          setPackage(package_on_delivery_result);

          socket.on('delivery_update', (payload) => {
            // console.log('payload', payload.delivery_object);
            setDelivery(payload.delivery_object);
            // socket.removeAllListeners('delivery_update');
          });
          // socket.connect();

          // console.log('test---------');
        } catch (error) {
          console.log('err activity_delivery fetch', error);
        }
        console.log('activity_existe');
      }
      // function getRandomInRange(from, to, fixed) {
      //   return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      //   // .toFixed() returns string, so ' * 1' is a trick to convert to number
      // }
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        setBrowserLocationLat(crd.latitude);
        setBrowserLocationLng(crd.longitude);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);

      // +++++++++++++++++//

      setInterval(() => {
        // setBrowserLocation({

        // lat: getRandomInRange(7, 12, 3),
        // lng: getRandomInRange(7, 12, 3),
        // });

        navigator.geolocation.getCurrentPosition(success, error, options);
        socket.emit('location_changed', {
          event: 'location_changed',
          DeliveryId,
          location: {
            lat: BrowserLocationLat && BrowserLocationLat,
            lng: BrowserLocationLng && BrowserLocationLng,
          },
        });

        console.log(
          'navigation change ' + BrowserLocationLng,
          BrowserLocationLat
        );
      }, 20000);

      setDelivery(result);
    } catch (err) {
      // setErr(err.message);
      console.log(err, 'erreur');
    }
  };

  return (
    <>
      <div className="parent-container">
        <form className="home__container" onSubmit={handleSubmit}>
          <h2 className="home__header">Web Driver</h2>
          <label htmlFor="username">Delivery Id</label>
          <div className="container-input-button">
            <input
              type="text"
              minLength={6}
              id="username"
              className="package__input package__user"
              placeholder="Enter Package Id"
              onChange={(event) => {
                setDeliveryId(event.target.value);
              }}
            />
            <button className="home__cta package_validate_button">Track</button>
          </div>
        </form>
        <div className="container-map-package-delivery">
          <div className="package-delivery-infos">
            <div className="delivery_Detail">
              <h4>Delivery Detail</h4>
              {!Delivery && 'no delivery at the moment'}
              <h6>{Delivery !== '' && Delivery.pickup_time}</h6>
              <h6>{Delivery !== '' && Delivery.location.lat}</h6>
              <h6>{Delivery !== '' && Delivery.location.lng}</h6>
              <h6>{Delivery !== '' && Delivery.status}</h6>
              <h1>
                {BrowserLocationLat !== undefined &&
                  BrowserLocationLat !== '' &&
                  BrowserLocationLat}
              </h1>
              <h1>
                {BrowserLocationLng !== undefined &&
                  BrowserLocationLng !== '' &&
                  BrowserLocationLng}
              </h1>
            </div>

            <div className="package_Detail">
              <h2>Package_Detail</h2>
              {!Package && 'no Package at the moment'}
              <h6>{Package ? Package.description : ''}</h6>
              <h6>{Package && Package.from_name}</h6>
              <h6>{Package && Package.from_location.lat}</h6>
              <h6>{Package && Package.from_location.lng}</h6>
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
                BrowserLocationLng !== '' ? BrowserLocationLng : 0
              }
              browser_location_lat={
                BrowserLocationLat !== '' ? BrowserLocationLat : 0
              }
            />
          </div>
          <div className="Status__button">
            <button
              className={
                Delivery !== '' && Delivery.status === 'open'
                  ? `home__cta package_validate_button pick__up`
                  : `home__cta package_validate_button pick__up package_validate_button_desable`
              }
              onClick={handlePickup}
              disabled={
                Delivery !== '' && Delivery.status === 'open' ? false : true
              }
              // value={Delivery.satus}
            >
              Picked Up
            </button>

            <button
              className={
                Delivery !== '' && Delivery.status === 'picked-up'
                  ? `home__cta package_validate_button pick__up`
                  : `home__cta package_validate_button pick__up package_validate_button_desable`
              }
              onClick={handleInTransit}
            >
              In-Transit
            </button>

            <button
              className={
                Delivery !== '' && Delivery.status === 'in-transit'
                  ? `home__cta package_validate_button pick__up`
                  : `home__cta package_validate_button pick__up package_validate_button_desable`
              }
              onClick={handleDelivered}
            >
              Delivered
            </button>

            <button
              className={
                Delivery !== '' && Delivery.status === 'in-transit'
                  ? `home__cta package_validate_button pick__up`
                  : `home__cta package_validate_button pick__up package_validate_button_desable`
              }
              onClick={handleFailed}
            >
              Failed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDriver;

// delivery_id: 649392b94039e5e2b3e9099b
// package_id:  6494a563c76ec54415defbe0
