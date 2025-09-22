import { createSlice } from "@reduxjs/toolkit";

export interface ICalcR {
  showCalc: boolean | null;
}

const initialState: ICalcR = {
  showCalc: null,
};

const showCalcSlice = createSlice({
  initialState,
  name: "showCalc",
  reducers: {
    showCalcReport: (state, action) => {
      state.showCalc = action.payload;
    },
  },
});

export const { showCalcReport } = showCalcSlice.actions;
export default showCalcSlice.reducer;
