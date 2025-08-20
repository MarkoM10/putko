import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
  isOpen: boolean;
  type: string;
  message: string;
}

const initialState: IModalState = {
  isOpen: false,
  type: "",
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        type?: string;
        message?: string;
        isOpen?: boolean;
      }>
    ) => {
      if (action.payload.type !== undefined) state.type = action.payload.type;
      if (action.payload.message !== undefined)
        state.message = action.payload.message;
      if (action.payload.isOpen !== undefined)
        state.isOpen = action.payload.isOpen;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "";
      state.message = "";
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
