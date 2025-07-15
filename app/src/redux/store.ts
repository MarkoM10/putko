import { configureStore } from "@reduxjs/toolkit";
import distanceMatrixReducer from "./distanceMatrix/distanceMatrixResSlice";
import reportModalReducer from "./reportModal/reportModalSlice";
import tripDataReducer from "./tripCalculationData/tripCalculationDataSlice";
import spinnerReducer from "./Spinner/SpinnerSlice";

export const store = configureStore({
  reducer: {
    matrixResData: distanceMatrixReducer,
    toggleModal: reportModalReducer,
    tripData: tripDataReducer,
    toggleSpinner: spinnerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
