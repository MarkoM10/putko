import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Authpage";
import AlertModal from "./components/AlertModal";

function App() {
  return (
    <Router>
      <div className="rootWrapper bg-background min-h-screen">
        <AlertModal />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
