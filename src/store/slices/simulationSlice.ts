import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISimulation } from "../../types/simulation";
import { DURATION } from "../../const";

// Define the initial state using that type
const initialState: ISimulation = {
  isStarted: false,
  isRunning: false,
  isFinished: false,
  cityArea: 1600,
  nOfHouses: 0,
  nOfOffices: 0,
  nOfSchools: 0,
  nOfSusceptible: 0,
  population: 0,
  reset: false,
  isFastForwarding: false,
  startingDateTimeMs: null,
  currentStep: 0,
  outbreakSizePercent: 0.1,
  nOfDeath: 0,
  nOfInfected: 0,
  nOfInfectedSympt: 0,
  nOfInfectedAsympt: 0,
  nOfExposed: 0,
  nOfImmune: 0,
  historyOfImmunized: [],
  historyOfInfected: [],
  historyOfSusceptible: [],
  historyOfExposed: [],
  historyOfDeaths: [],
  maskUsagePercentage: 0,
  lockDownPercentage: 0,
};

export const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setPopulation: (state, action: PayloadAction<number>) => {
      state.population = action.payload;
    },
    setNumberOfHouses: (state, action: PayloadAction<number>) => {
      state.nOfHouses = action.payload;
    },
    setNumberOfOffices: (state, action: PayloadAction<number>) => {
      state.nOfOffices = action.payload;
    },
    setNumberOfSchools: (state, action: PayloadAction<number>) => {
      state.nOfSchools = action.payload;
    },
    setCityArea: (state, action: PayloadAction<number>) => {
      state.cityArea = action.payload;
    },
    startSimulation: (state) => {
      state.isRunning = true;
      state.isStarted = true;
      // (globalThis as any).animator.start();
    },
    setStartingDateTimeMs: (state, action: PayloadAction<number>) => {
      state.startingDateTimeMs = action.payload;
    },
    stopSimulation: (state) => {
      state.isRunning = false;
      // (globalThis as any).animator.stop();
    },
    resetSimulation: (state) => {
      state.isStarted = false;
      state.isRunning = false;
      state.isFinished = false;
      state.currentStep = 0;
      state.startingDateTimeMs = null;
      state.nOfDeath = 0;
      state.nOfInfected = 0;
      state.nOfInfectedAsympt = 0;
      state.nOfInfectedSympt = 0;
      state.nOfExposed = 0;
      state.nOfImmune = 0;
      state.nOfSusceptible = 0;
      state.historyOfImmunized = [];
      state.historyOfInfected = [];
      state.historyOfSusceptible = [];
      state.historyOfExposed = [];
      state.historyOfDeaths = [];
      // (globalThis as any).animator.stop();
      state.reset = !state.reset;
      state.isFastForwarding = false;
    },
    increaseCurrentStep: (state) => {
      state.currentStep = state.currentStep + 1;
      if (state.currentStep === DURATION) {
        state.isFinished = true;
        state.isRunning = false;
        state.isFastForwarding = false;
      }
    },
    setOutbreakSizePercent: (state, action: PayloadAction<number>) => {
      state.outbreakSizePercent = action.payload;
    },
    increaseNumberOfDeath: (state) => {
      state.nOfDeath += 1;
    },
    setNumberOfInfected: (state, action: PayloadAction<number>) => {
      state.nOfInfected = action.payload;
    },
    setNumberOfInfectedAsympt: (state, action: PayloadAction<number>) => {
      state.nOfInfectedAsympt = action.payload;
    },
    setNumberOfInfectedSympt: (state, action: PayloadAction<number>) => {
      state.nOfInfectedSympt = action.payload;
    },
    setNumberOfSusceptible: (state, action: PayloadAction<number>) => {
      state.nOfSusceptible = action.payload;
    },
    setNumberOfExposed: (state, action: PayloadAction<number>) => {
      state.nOfExposed = action.payload;
    },
    setNumberOfImmune: (state, action: PayloadAction<number>) => {
      state.nOfImmune = action.payload;
    },
    sendToHistory: (
      state,
      action: PayloadAction<{
        infectedAsymptomatic: number;
        infectedSymptomatic: number;
        susceptible: number;
        exposed: number;
        immuned: number;
        deaths: number;
      }>
    ) => {
      state.historyOfInfected.push(
        action.payload.infectedAsymptomatic + action.payload.infectedSymptomatic
      );
      state.historyOfImmunized.push(action.payload.immuned);
      state.historyOfSusceptible.push(action.payload.susceptible);
      state.historyOfExposed.push(action.payload.exposed);
      state.historyOfDeaths.push(action.payload.deaths);
    },
    setMaskUsage: (state, action: PayloadAction<number>) => {
      state.maskUsagePercentage = action.payload;
    },
    setLockdownPercentage: (state, action: PayloadAction<number>) => {
      state.lockDownPercentage = action.payload;
    },
    setIsFastForwarding: (state) => {
      state.isFastForwarding = true;
    },
  },
});

export const {
  setIsStarted,
  setIsRunning,
  startSimulation,
  stopSimulation,
  setCityArea,
  setNumberOfHouses,
  setNumberOfOffices,
  setNumberOfSchools,
  setPopulation,
  resetSimulation,
  setOutbreakSizePercent,
  increaseCurrentStep,
  setNumberOfInfected,
  setNumberOfInfectedAsympt,
  setNumberOfInfectedSympt,
  increaseNumberOfDeath,
  setNumberOfSusceptible,
  setNumberOfExposed,
  setNumberOfImmune,
  sendToHistory,
  setStartingDateTimeMs,
  setMaskUsage,
  setLockdownPercentage,
  setIsFastForwarding,
} = simulationSlice.actions;

export default simulationSlice.reducer;
