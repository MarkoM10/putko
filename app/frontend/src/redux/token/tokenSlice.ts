import { createSlice } from "@reduxjs/toolkit";

export interface IToken {
  token: string | null;
}

const initialState: IToken = {
  token: null,
};

const tokenSLice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSLice.actions;
export default tokenSLice.reducer;
