import { createSlice } from "@reduxjs/toolkit";

export interface IAuthTab {
  isLoginTab: boolean;
}

const initialState: IAuthTab = {
  isLoginTab: false,
};

const isLoginTabSlice = createSlice({
  name: "authTab",
  initialState,
  reducers: {
    setLoginTab: (state, action) => {
      state.isLoginTab = action.payload;
    },
  },
});

export const { setLoginTab } = isLoginTabSlice.actions;
export default isLoginTabSlice.reducer;
