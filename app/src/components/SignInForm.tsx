import { useDispatch } from "react-redux";
import { setLoginTab } from "../redux/authTab/authTabSlice";
import { ChangeEvent, useState } from "react";
import { ISignInFormData } from "../interfaces/interfaces";
import { handleSignInFormValidation } from "../utils/formValidation";
import { hideSpinner, showSpinner } from "../redux/Spinner/SpinnerSlice";
import { signInService } from "../services/signInService";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../redux/alert/alertSlice";
import { setToken } from "../redux/token/tokenSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInFormData, setSignInFormData] = useState<ISignInFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationState, setValidationState] = useState<
    Record<string, boolean>
  >({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    const isValid =
      name === "confirmPassword"
        ? handleSignInFormValidation(value, name, signInFormData.password)
        : handleSignInFormValidation(value, name);

    setValidationState((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    setSignInFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(showSpinner());
    const result = await signInService(signInFormData);
    dispatch(hideSpinner());

    const { message, success, token } = result;

    dispatch(setToken(token));
    dispatch(showAlert({ success, message }));

    if (success) {
      navigate("/home");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
      <h1 className="text-primary-900 font-josefin text-2xl  font-bold  text-center">
        Kreiraj nalog
      </h1>
      <div>
        <label className="block mb-1 text-sm text-secondary font-inter">
          Korisničko ime
        </label>
        <input
          type="text"
          name="username"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-secondary font-inter">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-secondary font-inter">
          Lozinka
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-secondary font-inter">
          Potvrdi lozinku
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        className="text-white bg-primary-900 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 w-full"
      >
        Registruj se
      </button>
      <p>
        Već imaš nalog?{" "}
        <span
          onClick={() => dispatch(setLoginTab(true))}
          className="cursor-pointer text-primary-900"
        >
          Uloguj se
        </span>
      </p>
    </form>
  );
};

export default SignInForm;
