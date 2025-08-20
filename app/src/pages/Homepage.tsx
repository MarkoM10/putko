import { Outlet } from "react-router-dom";
import Putko from "../components/Putko";

const Homepage = () => {
  return (
    <div className="homePageWrapper py-8 md:py-0">
      <div className="mainWrapper flex justify-center md:items-center min-h-screen">
        <Putko>
          <Outlet />
        </Putko>
      </div>
    </div>
  );
};

export default Homepage;
