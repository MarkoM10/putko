import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import SignInForm from "../components/SignInForm";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import logo from "../images/putko.png";

const Authpage = () => {
  const { isLoginTab } = useSelector((state: RootState) => state.isLoginTab);

  console.log(isLoginTab);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="authWrapper w-full max-w-md p-12 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center"></div>
        {isLoginTab ? <LoginForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Authpage;
