import axios from "axios";
import { ICreateReportResponse } from "../interfaces/interfaces";

export const createReportService = async (
  token: string | null,
  id: number
): Promise<ICreateReportResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/reports",
      { trip_id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_trip_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: "PDF izveštaj uspešno kreiran.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Greška pri generisanju PDF-a.",
    };
  }
};
