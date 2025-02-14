import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETab, IUi } from "../../types/ui";

// Define the initial state using that type
const initialState: IUi = {
  currentTab: ETab.INTERACTIVE,
  chartSectionOpen: false,
  infoSectionOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<ETab>) => {
      state.currentTab = action.payload;
    },
    setChartSectionOpen: (state, action: PayloadAction<boolean>) => {
      state.chartSectionOpen = action.payload;
    },
    setInfoSectionOpen: (state, action: PayloadAction<boolean>) => {
      state.infoSectionOpen = action.payload;
    },
  },
});

export const { setCurrentTab, setChartSectionOpen, setInfoSectionOpen } =
  uiSlice.actions;

export default uiSlice.reducer;
