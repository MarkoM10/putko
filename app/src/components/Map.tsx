import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useState } from "react";
import Form from "./Form";
import { OriginAndDestination } from "../interfaces/interfaces";
const Map = () => {
  const [origin, setOrigin] = useState<null | OriginAndDestination>(null); //origin cordinates
  const [destination, setDestination] = useState<null | OriginAndDestination>(
    null
  ); //destination cordinates
  const [distance, setDistance] = useState<number | null>(null);

  //Setting Marker starting position to be in Belgrade
  const center = { lat: 44.7866, lng: 20.4489 };

  const [markerPosition, setMarkerPosition] = useState(center);

  //Loading Google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) return <div>Loading Google maps...</div>;

  //Function for getting Marker cordinates when user clicks on map
  const handleMapClick = (event: any) => {
    if (!origin) {
      setOrigin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    } else if (!destination) {
      setDestination({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  //Sending chosen cordinates to backend and as response getting distance data
  const calculateDistance = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (origin && destination) {
      try {
        const response = await axios.get(`http://localhost:5000/distance`, {
          params: { origin, destination },
        });
        const { data } = response;
        const distanceInM = data.rows[0].elements[0].distance.value;

        console.log(data);

        const distanceInKm = distanceInM / 1000;

        setDistance(distanceInKm);
        setOrigin(null);
        setDestination(null);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <div className="googleMapWrapper h-128">
      <GoogleMap
        zoom={5}
        mapContainerClassName="w-full h-full"
        center={center}
        onClick={handleMapClick}
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
