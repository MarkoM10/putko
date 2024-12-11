import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Map = () => {
  const matrixResData = useSelector((state: RootState) => state.matrixResData);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  //Rendering distance between origin and destination
  useEffect(() => {
    if (matrixResData.destination_addresses.length > 0) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: matrixResData.origin_addresses[0],
          destination: matrixResData.destination_addresses[0],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [matrixResData]);

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
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
