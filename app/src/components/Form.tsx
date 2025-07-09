import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setResponseData } from "../redux/distanceMatrix/distanceMatrixResSlice";
import React from "react";
import { FormData } from "../interfaces/interfaces";
import { fetchDistance } from "../services/distanceService";

const Form = () => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState<string>(""); //origin cordinates
  const [destination, setDestination] = useState<string>(""); //destination cordinates
  const [distance, setDistance] = useState<number | null>(null);
  const originRef = React.useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    fuelConsumption: "",
    fuelPrice: "",
    paytolls: 0,
    passengersNum: 0,
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

  //Getting all form input data and setting it to state variable
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Sending origin and destination locations params to backend and getting back the distance Matrix response
  const handleDistance = async () => {
    try {
      const data = await fetchDistance(origin, destination);
      const distanceInM = data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInM / 1000;

      dispatch(setResponseData(data));
      setDistance(distanceInKm);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //Getting the distance data on form submit, and getting the response from Chat GPT
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDistance();
  };

  //Form elements inside list for more DRY code
  const formFields = [
    {
      label: "Od",
      id: "origin",
      placeholder: "Unesi polaznu tačku...",
      isAutocomplete: true,
      ref: originRef,
      onPlaceChanged: handleOriginChange,
      required: true,
    },
    {
      label: "Do",
      id: "destination",
      placeholder: "Unesi odredišnu tačku...",
      isAutocomplete: true,
      ref: destinationRef,
      onPlaceChanged: handleDestinationChange,
      required: true,
    },
    {
      label: "Potrošnja na 100km (u litrima)",
      id: "fuelConsumption",
      placeholder: "Unesi potrošnju u L...",
      type: "number",
    },
    {
      label: "Cena goriva (po litru)",
      id: "fuelPrice",
      placeholder: "Unesi cenu goriva po litru...",
      type: "number",
    },
    {
      label: "Očekivane putarine (opciono)",
      id: "paytolls",
      placeholder: "Unesi očekivanu svotu za putarine u RSD...",
      type: "number",
    },
    {
      label: "Broj putnika (opciono)",
      id: "passengersNum",
      placeholder: "Unesi broj osoba...",
      type: "number",
    },
  ];

  if (!isLoaded) return <div>Loading Google maps...</div>;

  return (
    <div className="formWrapper">
      <div className="introTextWrapper mb-2 md:w-3/4">
        <h1 className="text-primary-400 font-josefin text-2xl  font-bold mb-2">
          Najprecizniji kalkulator putnih troškova
        </h1>
        <p className="text-secondary font-josefin text-xl">
          Unesi relaciju u okviru polja i mi ćemo ti vrlo precizno izračunati
          kompletne putne troškove.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="w-full grid md:gap-2">
          {formFields.map((field) => (
            <div key={field.id} className="mb-5">
              <label
                htmlFor={field.id}
                className="block mb-1 text-sm text-secondary font-inter"
              >
                {field.label}
              </label>
              {field.isAutocomplete ? (
                <Autocomplete
                  onLoad={(autocomplete) => (field.ref.current = autocomplete)}
                  onPlaceChanged={field.onPlaceChanged}
                >
                  <input
                    type="text"
                    id={field.id}
                    className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block md:w-3/4 w-full p-2"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </Autocomplete>
              ) : (
                <input
                  name={field.id}
                  id={field.id}
                  type={field.type || "text"}
                  min={field.type === "number" ? "0" : undefined}
                  className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block md:w-3/4 w-full p-2"
                  placeholder={field.placeholder}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-primary-400 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-1.5 my-2 md:w-3/4 w-full"
          >
            Izračunaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
