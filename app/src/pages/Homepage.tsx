import Navigation from "../components/Navigation";
import Map from "../components/Map";
import Form from "../components/TripForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import AlertModal from "../components/AlertModal";

const Homepage = () => {
  const data = useSelector((state: RootState) => state);

  return (
    <div className="homePageWrapper">
      <div className="mainWrapper flex justify-center">
        <div className="homeWrapper max-w-screen-xl w-10/12">
          <Navigation />
          <div className="appWrapper p-5 grid md:grid-cols-2 gap-4">
            <Form />
            <Map />
            <Modal />
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
