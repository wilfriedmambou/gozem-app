import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

export default function HomeMap({
  marker_lat,
  marker_lng,
  package_from_lat,
  package_from_lng,
  package_to_lat,
  package_to_lng,
  browser_location_lat,
  browser_location_lng,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBMBZdew-Dwcy8S7K8Zl7AUiNu-0xWOkJk',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      lat={marker_lat}
      lng={marker_lng}
      Mpackage_from_lat={package_from_lat}
      Mpackage_from_lng={package_from_lng}
      Mpackage_to_lat={package_to_lat}
      Mpackage_to_lng={package_to_lng}
      Mbrowser_location_lat={browser_location_lat}
      Mbrowser_location_lng={browser_location_lng}
    />
  );

  function Map({
    lat,
    lng,
    Mpackage_from_lat,
    Mpackage_from_lng,
    Mpackage_to_lat,
    Mpackage_to_lng,
    Mbrowser_location_lat,
    Mbrowser_location_lng,
  }) {
    console.log(Mpackage_from_lat, 'lat', Mpackage_from_lng, 'lng');
    const center_delivery = useMemo(() => ({ lat: lat, lng: lng }), []);
    const center_package_from = useMemo(
      () => ({ lat: Mpackage_from_lat, lng: Mpackage_from_lng }),
      []
    );
    const center_package_to = useMemo(
      () => ({ lat: Mpackage_to_lat, lng: Mpackage_to_lng }),
      []
    );
    const center_browser_location = useMemo(
      () => ({ lat: Mbrowser_location_lat, lng: Mbrowser_location_lng }),
      []
    );
    // const center2 = useMemo(() => ({ lat: 8.619543, lng: 0.824782 }), []);

    return (
      <GoogleMap
        zoom={4}
        center={center_delivery}
        mapContainerClassName="map-container"
      >
        {lat !== 0 && lng !== 0 && (
          <MarkerF
            position={center_delivery}
            label="delivery_position"
            title="Current Delivery Location"
          />
        )}
        {lat !== 0 && lng !== 0 && (
          <MarkerF
            position={center_package_from}
            label="Package From"
            title="Package From"
          />
        )}
        {lat !== 0 && lng !== 0 && (
          <MarkerF
            position={center_package_to}
            label="Package to"
            title="Package to"
          />
        )}
        {lat !== 0 && lng !== 0 && (
          <MarkerF
            position={center_browser_location}
            label="Browser_location  "
            title="Browser location"
          />
        )}
      </GoogleMap>
    );
  }
}
