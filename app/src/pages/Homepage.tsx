import Navigation from "../components/Navigation";
import Map from "../components/Map";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";

const Homepage = () => {
  const data = useSelector((state: RootState) => state);

  return (
    <div className="rootWrapper bg-background min-h-screen">
      <div className="mainWrapper flex justify-center">
        <div className="homeWrapper max-w-screen-xl w-10/12">
          <Navigation />
          <div className="appWrapper p-5 grid md:grid-cols-2 gap-4">
            <Form />
            <Map />
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
