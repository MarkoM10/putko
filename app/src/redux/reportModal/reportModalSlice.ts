import { createSlice } from "@reduxjs/toolkit";

export interface IReportModal {
  toggleModal: boolean;
}

const initialState: IReportModal = {
  toggleModal: false,
};

const toggleModalSlice = createSlice({
  name: "reportModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.toggleModal = true;
    },
    closeModal: (state) => {
      state.toggleModal = false;
    },
  },
});

export const { openModal, closeModal } = toggleModalSlice.actions;
export default toggleModalSlice.reducer;
