import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/DropDown';
import '../style/NewDelivery.css';
const NewDelivery = ({ socket }) => {
  const navigate = useNavigate();
  const [Package, setPackage] = useState();
  const [PackageId, setPackageId] = useState();
  const [PickupTime, setPickupTime] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [LocationLat, setLocationLat] = useState('');
  const [LocationLng, setLocationLng] = useState('');
  const [Status, setStatus] = useState('');

  const fetchPackageData = () => {
    fetch('http://localhost:4000/api/package/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPackage(data);
        setPackageId(data[0]._id);
        console.log('package new', data);
      });
  };

  useEffect(() => {
    fetchPackageData();
  }, []);
  // const handlePackageChange = async (e) => {
  //   e.preventDefault();
  //   setPackage(e.target);
  // };

  const handleSelectPackage = async (e) => {
    console.log(e.target);
    // setPackageId(e.target, 'elt');
    var index = e.target.selectedIndex;
    var optionElementID = e.target.childNodes[index];

    setPackageId(optionElementID.getAttribute('data-id'));
    // var option = optionElementID.getAttribute('data-id');

    console.log(optionElementID.getAttribute('data-id'), 'target');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      package_id: PackageId,
      pickup_time: PickupTime,
      start_time: StartTime,
      end_time: EndTime,
      location: {
        lat: LocationLat,
        lng: LocationLng,
      },
      status: Status,
    };
    console.log(body, 'test......ody');
    try {
      const response = await fetch('http://localhost:4000/api/delivery/', {
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

  return (
    <>
      <div className="new__delivery__body">
        <div className="center">
          <h1>New Delivery </h1>
          <form onSubmit={handleSubmit}>
            <div className="new-package-section1">
              {Package ? (
                <Dropdown menu={Package} handleSelect={handleSelectPackage} />
              ) : (
                <div className="inputbox">
                  <input
                    type="text"
                    required="required"
                    minLength={2}
                    id="package__id"
                    className="package__id__input "
                    placeholder="Enter package Id"
                    onChange={(event) => {
                      setPackage([event.target.value]);
                    }}
                  />
                </div>
              )}

              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="pick__up__time"
                  className="pick__up__time__input"
                  placeholder="pick up time"
                  onChange={(event) => {
                    setPickupTime(event.target.value);
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
                  id="start__time"
                  className="start__time__input"
                  placeholder="Enter Start Time"
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="end__time"
                  className="end__time__input"
                  placeholder="Enter End Time"
                  onChange={(event) => {
                    setEndTime(event.target.value);
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
                  id="location"
                  className="location__input"
                  placeholder="Enter Location lat"
                  onChange={(event) => {
                    setLocationLat(event.target.value);
                  }}
                />
              </div>

              <div className="inputbox">
                <input
                  type="text"
                  required="required"
                  minLength={2}
                  id="location"
                  className="location__input"
                  placeholder="Enter Location lng"
                  onChange={(event) => {
                    setLocationLng(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                minLength={2}
                id="status"
                className="status__input"
                placeholder="Enter Status"
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              />
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
