import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { ITripData, TripFormData } from "../interfaces/interfaces";
import { handleFormValidation } from "../utils/formValidation";
import { hideSpinner, showSpinner } from "../redux/Spinner/SpinnerSlice";
import { createTripService } from "../services/createTripService";
import { RootState } from "../redux/store";
import { showAlert } from "../redux/alert/alertSlice";
import { setTripData } from "../redux/tripCalculationData/tripCalculationDataSlice";
import CalcResult from "./CalcResult";
import { Link } from "react-router-dom";
import logo from "../images/putko.png";
import { showCalcReport } from "../redux/calcReport/calcReportSlice";

const TripCalc = () => {
  //States
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState<string>(""); //origin cordinates
  const [destination, setDestination] = useState<string>(""); //destination cordinates
  const originRef = React.useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const [formData, setFormData] = useState<TripFormData>({
    fuelConsumption: 0,
    fuelPrice: 0,
    paytolls: 0,
    passengersNum: 0,
    roundTrip: 1,
  });
  const [validationState, setValidationState] = useState<
    Record<string, boolean>
  >({});

  const { showCalc } = useSelector((state: RootState) => state.show_calc);

  //Redux
  const { token } = useSelector((state: RootState) => state.token);

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
    const isValid = handleFormValidation(value, name);
    setValidationState((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  //Getting the trip data
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormInvalid =
      Object.values(validationState).includes(false) ||
      Object.keys(validationState).length === 0 ||
      origin === "" ||
      destination === "";

    if (isFormInvalid) return;

    const { fuelConsumption, fuelPrice, passengersNum, paytolls, roundTrip } =
      formData;

    const tripData: ITripData = {
      origin,
      destination,
      fuel_consumption: fuelConsumption,
      fuel_price: fuelPrice,
      passengers: passengersNum,
      tolls: paytolls,
      is_round_trip: roundTrip,
    };

    dispatch(showSpinner());

    const tripCostsData = await createTripService(tripData, token);

    tripCostsData && dispatch(showCalcReport(true));
    dispatch(hideSpinner());

    const { success, message } = tripCostsData;

    dispatch(showAlert({ success, message }));

    dispatch(setTripData(tripCostsData.trip));
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
      placeholder: "Unesi cenu goriva po litru u RSD...",
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
    {
      label: "Povratno putovanje",
      name: "roundTrip",
      type: "radio",
      options: ["Da", "Ne"],
      values: [1, 0],
    },
  ];

  useEffect(() => {
    const savedReport = localStorage.getItem("lastReport");
    if (savedReport) {
      showCalcReport(JSON.parse(savedReport));
    }
  }, []);

  if (!isLoaded) return <div>Loading Google maps...</div>;

  return (
    <>
      {showCalc ? (
        <CalcResult />
      ) : (
        <div className="formWrapper flex justify-center">
          <div className="p-4 w-full">
            <div className="pb-8 pt-4">
              <Link to="/home">
                <img src={logo} alt="putko logotip" className="w-24" />
              </Link>
            </div>
            <div className="introTextWrapper mb-2 md:w-3/4">
              <h1 className="text-primary-900 font-josefin text-2xl  font-bold mb-2">
                Kalkulator putnih troškova
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
              <div className="w-full grid md:gap-2">
                {formFields.map((field) => (
                  <div key={field.id || field.name} className="mb-4">
                    {field.type === "radio" && field.options && field.values ? (
                      <>
                        <label className="block mb-1 text-sm text-secondary font-inter">
                          {field.label}
                        </label>
                        <div className="flex gap-4">
                          {field.options.map((optionLabel, index) => (
                            <label
                              key={field.values[index]}
                              htmlFor={`${field.name}${field.values[index]}`}
                              className="flex items-center gap-1 text-sm text-gray-700"
                            >
                              <input
                                type="radio"
                                name={field.name}
                                id={`${field.name}${field.values[index]}`}
                                defaultChecked={index === 0}
                                value={field.values[index]}
                                onChange={handleInputChange}
                                className="accent-primary-400"
                              />
                              {optionLabel}
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor={field.id}
                          className="block mb-1 text-sm text-secondary font-inter"
                        >
                          {field.label}
                        </label>
                        {field.isAutocomplete ? (
                          <Autocomplete
                            onLoad={(autocomplete) =>
                              (field.ref.current = autocomplete)
                            }
                            onPlaceChanged={field.onPlaceChanged}
                          >
                            <input
                              type="text"
                              id={field.id}
                              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
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
                            className={`bg-gray-50 border ${
                              field.id && validationState[field.id] === false
                                ? "border-danger"
                                : "border-border"
                            } text-gray-900 text-sm rounded-lg block w-full p-2`}
                            placeholder={field.placeholder}
                            onChange={handleInputChange}
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white bg-primary-900 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-1.5 my-2 w-full"
                >
                  Izračunaj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TripCalc;
