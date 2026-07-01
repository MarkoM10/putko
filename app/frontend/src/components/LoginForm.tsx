import { useDispatch } from "react-redux";
import { setLoginTab } from "../redux/authTab/authTabSlice";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { ILogInFormData } from "../interfaces/interfaces";
import { hideSpinner, showSpinner } from "../redux/Spinner/SpinnerSlice";
import { loginService } from "../services/loginService";
import { showAlert } from "../redux/alert/alertSlice";
import { setToken } from "../redux/token/tokenSlice";
import { setUser } from "../redux/user/userSlice";
import { validateLoginForm } from "../utils/formValidation";

const LoginForm = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const [loginFormData, setLoginFormData] = useState<ILogInFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  //Getting user input and setting it into state object
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handling form submission
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = loginFormData;
    const { isValid, errors } = validateLoginForm(email, password);
    setFormErrors(errors);

    //If input validation is successful login request is made
    if (isValid) {
      dispatch(showSpinner());
      const result = await loginService(loginFormData);
      dispatch(hideSpinner());
      const { message, success, token, user } = result;

      //Displaying result of request
      dispatch(showAlert({ success, message }));

      //If request is successful, token and user are set, user is navigated to the home page
      if (success) {
        dispatch(setToken(token));
        dispatch(
          setUser({
            user_id: user.user_id,
            username: user.username,
            user_email: user.user_email,
          }),
        );
        navigate("/home");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4" noValidate>
      <h1 className="text-primary-900 font-josefin text-2xl  font-bold  text-center">
        Uloguj se
      </h1>
      <div>
        <label className="block mb-1 text-sm text-secondary font-inter">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={(e) => handleInputChange(e)}
        />
        {formErrors.email && (
          <p className="text-danger-400 text-sm mt-1">{formErrors.email}</p>
        )}
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
          onChange={(e) => handleInputChange(e)}
        />
        {formErrors.password && (
          <p className="text-danger-400 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-primary-900 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 w-full"
      >
        Uloguj se
      </button>
      <p>
        Nemaš kreiran nalog?{" "}
        <span
          onClick={() => dispatch(setLoginTab(false))}
          className="cursor-pointer text-primary-900"
        >
          Registruj se
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
