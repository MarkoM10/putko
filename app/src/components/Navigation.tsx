import logo from "../images/putko.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigationWrapper w-full flex justify-between my-10">
      <Link to="/">
        <img src={logo} alt="putko logotip" className="w-32" />
      </Link>
      <button
        type="button"
        className="text-white bg-primary-400 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-1.5 my-2"
      >
        Saznaj više
      </button>
    </div>
  );
};

export default Navigation;
