import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

const Form = () => {
  const [origin, setOrigin] = useState<string>(""); //origin cordinates
  const [destination, setDestination] = useState<string>(""); //destination cordinates
  const [distance, setDistance] = useState<number | null>(null);

  //Loading Google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  //Sending chosen cordinates to backend and as response getting distance data
  const calculateDistance = async (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    // Update the respective state
    if (id === "origin") {
      setOrigin(value);
    } else if (id === "destination") {
      setDestination(value);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/distance`, {
        params: { origin, destination },
      });
      const { data } = response;
      const distanceInM = data.rows[0].elements[0].distance.value;
      const distanceInKm = distanceInM / 1000;

      setDistance(distanceInKm);

      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
            <Autocomplete>
              <input
                onChange={calculateDistance}
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
            <Autocomplete>
              <input
                onChange={calculateDistance}
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
            >
              <option selected>Odaberi model vozila...</option>
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
              Marka
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option selected>Odaberi marku vozila...</option>
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
              <option selected>Odaberi godinu proizvodnje...</option>
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
              <option selected>Odaberi gorivo...</option>
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
