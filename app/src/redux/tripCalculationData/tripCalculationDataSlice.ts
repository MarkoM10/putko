import { createSlice } from "@reduxjs/toolkit";

export interface ITripData {
  destination: string;
  origin: string;
  totalDistance: number;
  distancePerDirection: number;
  fuelConsumption: number;
  fuelPrice: number;
  paytolls: number;
  roundTrip: string;
  passengersNum: number;
  totalTripCost: number;
  tripCostPerPerson: number;
}

const initialState: ITripData = {
  destination: "",
  origin: "",
  totalDistance: 0,
  distancePerDirection: 0,
  fuelConsumption: 0,
  fuelPrice: 0,
  paytolls: 0,
  roundTrip: "",
  passengersNum: 0,
  totalTripCost: 0,
  tripCostPerPerson: 0,
};

const tripDataSlice = createSlice({
  name: "tripData",
  initialState,
  reducers: {
    setTripData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTripData } = tripDataSlice.actions;
export default tripDataSlice.reducer;
