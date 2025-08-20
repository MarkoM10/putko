import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeModal } from "../redux/modal/modalSlice";
import { ButtonHTMLAttributes, ReactEventHandler } from "react";
import { clearToken } from "../redux/token/tokenSlice";

export default function Modal() {
  const { isOpen, type, message } = useSelector(
    (state: RootState) => state.toggleModal
  );
  const dispatch = useDispatch();

  const handleModalType = () => {
    switch (type) {
      case "LOGOUT_MODAL":
        dispatch(clearToken());
        dispatch(closeModal());
        break;
      default:
        break;
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
            <p className="text-gray-600 mt-2">{message}</p>

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
