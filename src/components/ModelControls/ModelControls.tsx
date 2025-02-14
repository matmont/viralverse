import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSimulation,
  setIsFastForwarding,
  startSimulation,
  stopSimulation,
} from "../../store/slices/simulationSlice";
import { RootState } from "../../store/store";
import VirusSelector from "./VirusSelector/VirusSelector";
import MaskUsageSelector from "./MaskUsageSelector";
import LockdownAmountSelector from "./LockdownAmountSelector";
import CityAreaSelector from "./CityAreaSelector";
import OutbreakSizeSelector from "./OutbreakSizeSelector";
const ModelControls = () => {
  const dispatch = useDispatch();
  const { isRunning, isStarted, isFinished, isFastForwarding } = useSelector(
    (state: RootState) => state.simulation
  );
  return (
    <Flex height="100%" direction="column" p="4">
      <Heading mb="4">Controls</Heading>
      <Grid columns="3" gap="4">
        <Button
          disabled={isFinished || isFastForwarding}
          onClick={() => {
            if (isFinished || isFastForwarding) {
              return;
            }
            if (isRunning) {
              dispatch(stopSimulation());
              return;
            }
            dispatch(startSimulation());
          }}
        >
          {isRunning ? <StopIcon /> : <PlayIcon />}
          {isRunning ? "Pause" : isStarted ? "Resume" : "Start"}
        </Button>
        <Button
          disabled={isFinished || isRunning || !isStarted || isFastForwarding}
          onClick={() => {
            if (isFinished || isRunning || !isStarted || isFastForwarding) {
              return;
            }

            dispatch(setIsFastForwarding());
          }}
        >
          Fast Forward
        </Button>
        <Button
          disabled={isRunning || isFastForwarding}
          onClick={() => {
            if (isRunning || isFastForwarding) {
              return;
            }
            dispatch(resetSimulation());
          }}
        >
          Reset Simulator
        </Button>
        <VirusSelector />
        <MaskUsageSelector />
        <LockdownAmountSelector />
        <CityAreaSelector />
        <OutbreakSizeSelector />
      </Grid>
    </Flex>
  );
};

export default ModelControls;
