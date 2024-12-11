import {
  Autocomplete,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setResponseData } from "../redux/distanceMatrix/distanceMatrixResSlice";
import React from "react";
import { CarManufacturers } from "../interfaces/interfaces";

const Form = () => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState<string>(""); //origin cordinates
  const [destination, setDestination] = useState<string>(""); //destination cordinates
  const [distance, setDistance] = useState<number | null>(null);
  const originRef = React.useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const [carManufacturers, setCarManufacturers] = useState<CarManufacturers>({
    carManufacturers: [],
  });

  //Loading Google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  // Function to handle the Autocomplete selection for origin
  const handleOriginChange = () => {
    if (originRef.current) {
      const place = originRef.current.getPlace();
      if (place && place.formatted_address) {
        setOrigin(place.formatted_address);
      }
    }
  };

  // Function to handle the Autocomplete selection for destination
  const handleDestinationChange = () => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlace();
      if (place && place.formatted_address) {
        setDestination(place.formatted_address);
      }
    }
  };

  //Sending origin and destination locations params to backend and getting back the distance Matrix response
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(origin);
    console.log(destination);

    try {
      const response = await axios.get(`http://localhost:5000/distance`, {
        params: { origin, destination },
      });
      const { data } = response;
      const distanceInM = data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInM / 1000;

      dispatch(setResponseData(data));
      setDistance(distanceInKm);

      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    // Fetch the data from the public/cars.json file
    fetch("/cars.json")
      .then((response) => response.json())
      .then((data) => {
        setCarManufacturers(data);
      })
      .catch((error) =>
        console.error("Error fetching car manufacturers:", error)
      );
  }, []);

  const handleCarManufacturerChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
  };

  if (!isLoaded) return <div>Loading Google maps...</div>;

  return (
    <div className="formWrapper my-6">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="w-full grid md:grid-cols-2 md:gap-4">
          <div className="mb-5">
            <label
              htmlFor="origin"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Od
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (originRef.current = autocomplete)}
              onPlaceChanged={handleOriginChange}
            >
              <input
                type="text"
                id="origin"
                className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                placeholder="Unesi polaznu tačku..."
                required
              />
            </Autocomplete>
          </div>
          <div className="mb-5">
            <label
              htmlFor="origin"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Do
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
              onPlaceChanged={handleDestinationChange}
            >
              <input
                type="text"
                id="destination"
                className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                placeholder="Unesi odredišnu tačku..."
                required
              />
            </Autocomplete>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Model
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
              onChange={handleCarManufacturerChange}
            >
              <option defaultChecked>Odaberi model vozila...</option>
              {carManufacturers?.carManufacturers.map((el) => (
                <option key={el.id} value={el.manufacturer}>
                  {el.manufacturer}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Marka
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option defaultChecked>Odaberi marku vozila...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Godina proizvodnje
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option defaultChecked>Odaberi godinu proizvodnje...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Gorivo
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option defaultChecked>Odaberi gorivo...</option>
              <option value="US">Dizel</option>
              <option value="CA">Benzin</option>
              <option value="FR">Gas</option>
              <option value="DE">Metan</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="text-white bg-primary-400 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-1.5 my-2 w-96"
          >
            Izračunaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
