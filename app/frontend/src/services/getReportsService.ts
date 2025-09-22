import axios from "axios";

export const getReportsService = async (token: string | null) => {
  try {
    const response = await axios.get("http://localhost:5000/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { reports } = response.data;

    return { success: true, reports };
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
      message: "Došlo je do greške prilikom izlistavanja PDF izveštaja.",
    };
  }
};
