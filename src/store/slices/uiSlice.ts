import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUi } from "../../types/ui";

// Define the initial state using that type
const initialState: IUi = {
  chartSectionOpen: false,
  infoSectionOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setChartSectionOpen: (state, action: PayloadAction<boolean>) => {
      state.chartSectionOpen = action.payload;
    },
    setInfoSectionOpen: (state, action: PayloadAction<boolean>) => {
      state.infoSectionOpen = action.payload;
    },
  },
});

export const { setChartSectionOpen, setInfoSectionOpen } = uiSlice.actions;

export default uiSlice.reducer;
