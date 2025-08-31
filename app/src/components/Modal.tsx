import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeModal } from "../redux/modal/modalSlice";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ReactEventHandler,
  useState,
} from "react";
import { clearToken } from "../redux/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { createReportService } from "../services/createReportService";
import { ITripCalcData } from "../redux/tripCalculationData/tripCalculationDataSlice";
import { showAlert } from "../redux/alert/alertSlice";
import { addToFavoritesService } from "../services/addToFavoritesService";
import { deleteFromFavoritesService } from "../services/deleteFromFavoriteService";
import { hideSpinner, showSpinner } from "../redux/Spinner/SpinnerSlice";
import { deleteTripService } from "../services/deleteTripService";

export default function Modal() {
  const { isOpen, type } = useSelector((state: RootState) => state.toggleModal);
  const modalMessage = useSelector(
    (state: RootState) => state.toggleModal.message
  );
  const { token } = useSelector((state: RootState) => state.token);
  const { trip_id } = useSelector((state: RootState) => state.trip_id);
  const { id } = useSelector(
    (state: { tripCalcData: ITripCalcData }) => state.tripCalcData
  );

  const [alias, setAlias] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAlias(value);
  };

  let message: string | undefined;
  let success: boolean | undefined;

  const handleModalType = async () => {
    switch (type) {
      case "LOGOUT_MODAL":
        dispatch(clearToken());
        dispatch(closeModal());
        break;

      case "GENERATE_PDF_MODAL":
        dispatch(showSpinner());
        const resultReport = await createReportService(token, id);
        dispatch(hideSpinner());
        ({ message, success } = resultReport);
        break;

      case "ADD_TO_FAVORITES_MODAL":
        dispatch(showSpinner());
        const resultFavorites = await addToFavoritesService(
          token,
          trip_id,
          alias
        );
        dispatch(hideSpinner());
        ({ message, success } = resultFavorites);
        break;

      case "DELETE_FROM_FAVORITES_MODAL":
        dispatch(showSpinner());
        const resultRemoveFavorites = await deleteFromFavoritesService(
          token,
          trip_id
        );
        dispatch(hideSpinner());
        ({ message, success } = resultRemoveFavorites);
        break;
      case "DELETE_TRIP_MODAL":
        dispatch(showSpinner());
        const resultDeletTrip = await deleteTripService(token, trip_id);
        dispatch(hideSpinner());
        ({ message, success } = resultDeletTrip);
        break;
      default:
        break;
    }

    if (message !== undefined && success !== undefined) {
      dispatch(showAlert({ success, message }));
      dispatch(closeModal());

      if (success && type === "GENERATE_PDF_MODAL") {
        navigate("reports");
      }

      // if (success && type === "ADD_TO_FAVORITES_MODAL") {
      //   navigate("favorites");
      // }
    }
  };

  const handleConfirm = () => {
    handleModalType();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-primary-900">
              Potvrda akcije
            </h2>
            <p className="text-gray-600 mt-2">{modalMessage}</p>
            {type === "ADD_TO_FAVORITES_MODAL" && (
              <input
                type="text"
                id="alias"
                className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2 mt-2"
                placeholder="Unesi naziv za omiljeno putovanje..."
                required
                onChange={(e) => handleOnChange(e)}
                name="alias"
                maxLength={255}
              />
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => dispatch(closeModal())}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Otkaži
              </button>
              <button
                onClick={() => {
                  handleConfirm();
                }}
                className="px-4 py-2 rounded-lg bg-primary-900 text-white hover:opacity-90"
              >
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
