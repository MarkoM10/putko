import {
  User,
  Plane,
  Heart,
  FileText,
  BarChart2,
  LogOut,
  Calculator,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal } from "../redux/modal/modalSlice";
import { RootState } from "../redux/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(
      setModal({
        type: "LOGOUT_MODAL",
        message: "Da li si siguran da želiš da se izloguješ?",
        isOpen: true,
      })
    );
  };

  return (
    <div className="sidebarWrapper bg-primary-900 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 flex flex-col justify-between text-white">
      <div className="space-y-6">
        <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition">
          <User className="w-5 h-5" />
          <span className="font-medium">{user.username}</span>
        </div>
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
        >
          <Calculator className="w-5 h-5" />
          <span>Kalkulator</span>
        </div>

        <div
          onClick={() => navigate("trips")}
          className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
        >
          <Plane className="w-5 h-5" />
          <span>Putovanja</span>
        </div>

        <div
          onClick={() => navigate("favorites")}
          className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
        >
          <Heart className="w-5 h-5" />
          <span>Omiljene rute</span>
        </div>

        <div
          onClick={() => navigate("reports")}
          className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition"
        >
          <FileText className="w-5 h-5" />
          <span>PDF izveštaji</span>
        </div>

        {/* <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition">
          <BarChart2 className="w-5 h-5" />
          <span>Statistika</span>
        </div> */}
      </div>

      <div
        onClick={() => handleLogout()}
        className="flex items-center gap-3 cursor-pointer hover:text-gray-300 transition mt-8"
      >
        <LogOut className="w-5 h-5" />
        <span>Odjavi se</span>
      </div>
    </div>
  );
};

export default Sidebar;
