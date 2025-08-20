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

    const { message, token, user } = response.data;

    console.log(response);

    return {
      success: true,
      message,
      token,
      user,
    };
  } catch (error: any) {
    const { data } = error.response;

    if (error.response && data && data.message) {
      return {
        success: false,
        message: data.message,
        token: null,
        user: {
          user_id: null,
          username: null,
          user_email: null,
        },
      };
    }

    return {
      success: false,
      message: "Došlo je do greške prilikom logovanja.",
      token: null,
      user: {
        user_id: null,
        username: null,
        user_email: null,
      },
    };
  }
};
