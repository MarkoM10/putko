import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DistanceMatrixRes {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: {
    elements: {
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      duration_in_traffic: {
        text: string;
        value: number;
      };
      status: string;
    }[];
  }[];
  status: string;
}

const initialState: DistanceMatrixRes = {
  destination_addresses: [],
  origin_addresses: [],
  rows: [],
  status: "",
};

const distanceMatrixResSlice = createSlice({
  name: "matrixResData",
  initialState,
  reducers: {
    setResponseData: (state, action: PayloadAction<DistanceMatrixRes>) => {
      return action.payload;
    },
  },
});

export const { setResponseData } = distanceMatrixResSlice.actions;
export default distanceMatrixResSlice.reducer;
