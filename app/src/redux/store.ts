import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reportModalReducer from "./modal/modalSlice";
import tripDataReducer from "./tripCalculationData/tripCalculationDataSlice";
import spinnerReducer from "./Spinner/SpinnerSlice";
import isLoginTabReducer from "./authTab/authTabSlice";
import alertReducer from "./alert/alertSlice";
import tokenReducer from "./token/tokenSlice";
import userReducer from "./user/userSlice";
import tripIDreducer from "./tripId/tripIdSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "user"],
};

const rootReducer = combineReducers({
  toggleModal: reportModalReducer,
  tripCalcData: tripDataReducer,
  toggleSpinner: spinnerReducer,
  isLoginTab: isLoginTabReducer,
  alertReducer: alertReducer,
  token: tokenReducer,
  user: userReducer,
  trip_id: tripIDreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
