import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITripCalcData {
  id: number;
  user_id: number;
  origin: string;
  destination: string;
  distance_km: string;
  fuel_consumption: string;
  fuel_price: string;
  tolls: string;
  passengers: number;
  is_round_trip: boolean;
  total_cost: string;
  cost_per_person: string;
  created_at: string;
}

const initialState: ITripCalcData = {
  id: 0,
  user_id: 0,
  origin: "",
  destination: "",
  distance_km: "",
  fuel_consumption: "",
  fuel_price: "",
  tolls: "",
  passengers: 0,
  is_round_trip: false,
  total_cost: "",
  cost_per_person: "",
  created_at: "",
};

const tripDataSlice = createSlice({
  name: "tripCalcData",
  initialState,
  reducers: {
    setTripData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTripData } = tripDataSlice.actions;
export default tripDataSlice.reducer;
