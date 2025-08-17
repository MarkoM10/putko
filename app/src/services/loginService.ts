import axios from "axios";
import { ILogInFormData, ILoginResponse } from "../interfaces/interfaces";
export const loginService = async (
  signInFormData: ILogInFormData
): Promise<ILoginResponse> => {
  try {
    const { password, email } = signInFormData;

    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
    };
  } catch (error: any) {
    const { data } = error.response;

    if (error.response && data && data.message) {
      return {
        success: false,
        message: data.message,
        token: "",
      };
    }

    return {
      success: false,
      message: "Došlo je do greške prilikom logovanja.",
      token: "",
    };
  }
};
