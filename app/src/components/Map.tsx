import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import { useState } from "react";
import Form from "./Form";
const Map = () => {
  //Setting Marker starting position to be in Belgrade
  const center = { lat: 44.7866, lng: 20.4489 };

  const [markerPosition, setMarkerPosition] = useState(center);

  //Loading Google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Google maps...</div>;

  return (
    <div className="googleMapWrapper h-128">
      <GoogleMap
        zoom={5}
        mapContainerClassName="w-full h-full"
        center={center}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default Map;
