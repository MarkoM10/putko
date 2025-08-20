import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ITripCalcData } from "../redux/tripCalculationData/tripCalculationDataSlice";
const Map = () => {
  const {
    origin,
    destination,
    distance_km,
    fuel_consumption,
    fuel_price,
    tolls,
    passengers,
    is_round_trip,
    total_cost,
    cost_per_person,
  } = useSelector(
    (state: { tripCalcData: ITripCalcData }) => state.tripCalcData
  );

  const distance_n = Number(distance_km);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  //Rendering distance between origin and destination
  useEffect(() => {
    if (distance_n > 0) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
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
  }, [origin]);

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
    <div className="googleMapWrapper h-[40rem] md:h-auto rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none overflow-hidden">
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
