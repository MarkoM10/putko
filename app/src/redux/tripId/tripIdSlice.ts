import { createSlice } from "@reduxjs/toolkit";

export interface ITripID {
  trip_id: number | null;
}

const initialState: ITripID = {
  trip_id: null,
};

const tripIdSlice = createSlice({
  initialState,
  name: "tripId",
  reducers: {
    setTripID: (state, action) => {
      state.trip_id = action.payload;
    },
  },
});

export const { setTripID } = tripIdSlice.actions;
export default tripIdSlice.reducer;
