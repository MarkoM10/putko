import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Authpage";
import AlertModal from "./components/AlertModal";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "../src/components/Spinner";
import Trips from "./components/Trips";
import TripCalc from "./components/TripCalc";
import Favorites from "./components/Favorites";
import Reports from "./components/Reports";
import Modal from "./components/Modal";

function App() {
  return (
    <Router>
      <div className="rootWrapper  bg-background min-h-screen bg-center">
        <AlertModal />
        <Spinner />
        <Modal />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Homepage />}>
              <Route index element={<TripCalc />} />
              <Route path="trips" element={<Trips />} />
              <Route path="favorites" element={<Favorites />} />{" "}
              <Route path="reports" element={<Reports />} />
              {/* <Route path="profile" element={<Profile />} />  */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
