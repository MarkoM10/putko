import { configureStore } from "@reduxjs/toolkit";
import distanceMatrixReducer from "./distanceMatrix/distanceMatrixResSlice";
import reportModalReducer from "./reportModal/reportModalSlice";
import tripDataReducer from "./tripCalculationData/tripCalculationDataSlice";
import spinnerReducer from "./Spinner/SpinnerSlice";
import isLoginTabReducer from "./authTab/authTabSlice";
import alertReducer from "./alert/alertSlice";

export const store = configureStore({
  reducer: {
    matrixResData: distanceMatrixReducer,
    toggleModal: reportModalReducer,
    tripData: tripDataReducer,
    toggleSpinner: spinnerReducer,
    isLoginTab: isLoginTabReducer,
    alertReducer: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
