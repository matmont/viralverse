import { configureStore } from "@reduxjs/toolkit";
import simulationReducer from "./slices/simulationSlice";
import virusReducer from "./slices/virusSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    simulation: simulationReducer,
    viruses: virusReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
