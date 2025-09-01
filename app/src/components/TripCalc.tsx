import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { ITripData, TripFormData } from "../interfaces/interfaces";
import { handleTripCalcFormValidation } from "../utils/formValidation";
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  //Getting the trip data
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, errors } = handleTripCalcFormValidation(
      origin,
      destination,
      formData
    );
    setFormErrors(errors);

    if (isValid) {
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
      dispatch(hideSpinner());

      const { success, message } = tripCostsData;
      dispatch(showAlert({ success, message }));

      if (success) {
        tripCostsData && dispatch(showCalcReport(true));
        dispatch(setTripData(tripCostsData.trip));
      }
    }
  };

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
        <div className="formWrapper bg-white flex justify-center">
          <div className="p-4 w-full">
            <div className="pt-4 pb-4 w-20">
              <Link to="/home">
                <img src={logo} alt="putko logotip" className="w-24" />
              </Link>
            </div>
            <div className="introTextWrapper mb-2 md:w-3/4">
              <h1 className="text-primary-900 font-josefin text-2xl  font-bold mb-2">
                Kalkulator putnih troškova
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-4 mb-4"
              noValidate
            >
              <div className="w-full grid">
                <div className="grid grid-cols-2 gap-2">
                  <div className="mb-4">
                    <label
                      htmlFor="origin"
                      className="block mb-1 text-sm text-secondary font-inter"
                    >
                      Od
                    </label>
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (originRef.current = autocomplete)
                      }
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
                    {formErrors.origin && (
                      <p className="text-danger-400 text-sm mt-1">
                        {formErrors.origin}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="destination"
                      className="block mb-1 text-sm text-secondary font-inter"
                    >
                      Do
                    </label>
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (destinationRef.current = autocomplete)
                      }
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
                    {formErrors.destination && (
                      <p className="text-danger-400 text-sm mt-1">
                        {formErrors.destination}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="fuelConsumption"
                    className="block mb-1 text-sm text-secondary font-inter"
                  >
                    Potrošnja na 100km (u litrima)
                  </label>
                  <input
                    type="number"
                    name="fuelConsumption"
                    id="fuelConsumption"
                    min="0"
                    className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                    placeholder="Unesi potrošnju u L..."
                    onChange={handleInputChange}
                  />
                  {formErrors.fuelConsumption && (
                    <p className="text-danger-400 text-sm mt-1">
                      {formErrors.fuelConsumption}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fuelPrice"
                    className="block mb-1 text-sm text-secondary font-inter"
                  >
                    Cena goriva (po litru)
                  </label>
                  <input
                    type="number"
                    name="fuelPrice"
                    id="fuelPrice"
                    min="0"
                    className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                    placeholder="Unesi cenu goriva po litru u RSD..."
                    onChange={handleInputChange}
                  />
                  {formErrors.fuelPrice && (
                    <p className="text-danger-400 text-sm mt-1">
                      {formErrors.fuelPrice}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="paytolls"
                    className="block mb-1 text-sm text-secondary font-inter"
                  >
                    Očekivane putarine (opciono)
                  </label>
                  <input
                    type="number"
                    name="paytolls"
                    id="paytolls"
                    min="0"
                    className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                    placeholder="Unesi očekivanu svotu za putarine u RSD..."
                    onChange={handleInputChange}
                  />
                  {formErrors.paytolls && (
                    <p className="text-danger-400 text-sm mt-1">
                      {formErrors.paytolls}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="passengersNum"
                    className="block mb-1 text-sm text-secondary font-inter"
                  >
                    Broj putnika (opciono)
                  </label>
                  <input
                    type="number"
                    name="passengersNum"
                    id="passengersNum"
                    min="0"
                    className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
                    placeholder="Unesi broj osoba..."
                    onChange={handleInputChange}
                  />
                  {formErrors.passengersNum && (
                    <p className="text-danger-400 text-sm mt-1">
                      {formErrors.passengersNum}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm text-secondary font-inter">
                    Povratno putovanje
                  </label>
                  <div className="flex gap-4">
                    <label
                      htmlFor="roundTrip1"
                      className="flex items-center gap-1 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="roundTrip"
                        id="roundTrip1"
                        value={1}
                        defaultChecked
                        onChange={handleInputChange}
                        className="accent-primary-400"
                      />
                      Da
                    </label>
                    <label
                      htmlFor="roundTrip0"
                      className="flex items-center gap-1 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="roundTrip"
                        id="roundTrip0"
                        value={0}
                        onChange={handleInputChange}
                        className="accent-primary-400"
                      />
                      Ne
                    </label>
                  </div>
                </div>
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
