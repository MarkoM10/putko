import Navigation from "../components/Navigation";
import Map from "../components/Map";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Homepage = () => {
  const data = useSelector((state: RootState) => state);

  return (
    <div className="rootWrapper bg-background">
      <div className="mainWrapper flex justify-center">
        <div className="homeWrapper max-w-screen-xl w-10/12">
          <Navigation />
          <div className="introTextWrapper mb-2">
            <h1 className="text-primary-400 font-josefin text-5xl text-center font-bold mb-2">
              Najprecizniji kalkulator putnih troškova
            </h1>
            <p className="text-secondary font-josefin text-center text-2xl">
              Unesi relaciju u okviru polja i mi ćemo ti vrlo precizno
              izračunati kompletne putne troškove.
            </p>
          </div>
          <Map />
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
