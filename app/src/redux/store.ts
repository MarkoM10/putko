import { configureStore } from "@reduxjs/toolkit";
import distanceMatrixReducer from "./distanceMatrix/distanceMatrixResSlice";
import reportModalReducer from "./reportModal/reportModalSlice";
import tripDataReducer from "./tripCalculationData/tripCalculationDataSlice";

export const store = configureStore({
  reducer: {
    matrixResData: distanceMatrixReducer,
    toggleModal: reportModalReducer,
    tripData: tripDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
