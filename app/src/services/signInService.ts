import axios from "axios";
import { ISignInFormData, ISignInResponse } from "../interfaces/interfaces";
export const signInService = async (
  signInFormData: ISignInFormData
): Promise<ISignInResponse> => {
  try {
    const { username, password, email } = signInFormData;

    const response = await axios.post("http://localhost:5000/signup", {
      username,
      password,
      email,
    });

    const { message } = response.data;

    return {
      success: true,
      message: message,
    };
  } catch (error: any) {
    const { data } = error.response;

    if (error.response && data && data.message) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: false,
      message: "Došlo je do greške prilikom registracije.",
    };
  }
};
