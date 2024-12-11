import { configureStore } from "@reduxjs/toolkit";
import distanceMatrixReducer from "./distanceMatrix/distanceMatrixResSlice";

export const store = configureStore({
  reducer: {
    matrixResData: distanceMatrixReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
