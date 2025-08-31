import Map from "../components/Map";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

const Putko = ({ children }: any) => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <div className="putkoWrapper md:h-[50rem] max-w-[1440px] w-11/12">
      <div className="h-full w-full rounded-3xl bg-neutral-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_-6px_10px_-4px_rgba(0,0,0,0.08)]">
        <div
          className={`appWrapper h-full grid ${
            pathname === "/home"
              ? "md:grid-cols-[20%_40%_40%]"
              : "md:grid-cols-[20%_80%]"
          }`}
        >
          <Sidebar />
          {children}
          {pathname === "/home" && <Map />}
          <Modal />
        </div>
      </div>
    </div>
  );
};

export default Putko;
