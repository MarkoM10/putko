import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  user_id: number | null;
  username: string | null;
  user_email: string | null;
}

const initialState: IUser = {
  user_id: 0,
  username: "",
  user_email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
