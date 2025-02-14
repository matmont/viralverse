import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVirus } from "../../types/virus";

interface IVirusState {
  viruses: IVirus[];
  selectedVirus: string | null;
}

// Define the initial state using that type
const initialState: IVirusState = {
  viruses: [
    {
      id: "base-virus",
      name: "Sample Virus",
      probabilityOfDeath: 0.4, // range: [0, 1]
      probabilityOfImmunity: 0.2,
      probabilityOfInfection: 0.3,
      probabilityOfSymptoms: 0.5,
      timeOfDiseaseDays: 10,
      timeOfIncubationDays: 7,
    },
  ],
  selectedVirus: "base-virus",
};

export const virusSlice = createSlice({
  name: "virus",
  initialState,
  reducers: {
    addVirus: (state, action: PayloadAction<IVirus>) => {
      state.viruses.push(action.payload);
    },
    setSelectedVirus: (state, action: PayloadAction<string | null>) => {
      state.selectedVirus = action.payload;
    },
  },
});

export const { addVirus, setSelectedVirus } = virusSlice.actions;

export default virusSlice.reducer;
