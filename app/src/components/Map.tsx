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
  const { origin, destination, distance_km } = useSelector(
    (state: { tripCalcData: ITripCalcData }) => state.tripCalcData
  );

  const { showCalc } = useSelector((state: RootState) => state.show_calc);

  const distance_n = Number(distance_km);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  //Rendering distance between origin and destination
  useEffect(() => {
    if (!origin || !destination || distance_n <= 0) {
      setDirections(null); // ✅ očisti mapu ako podaci nisu validni
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Greška pri generisanju rute:", status);
          setMarkerPosition(center);
          setDirections(null);
        }
      }
    );
  }, [origin, destination, distance_n]);

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
