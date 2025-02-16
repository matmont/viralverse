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

  const canPauseStartSimulation = isFinished || isFastForwarding;
  const canFastForward =
    isFinished || isRunning || !isStarted || isFastForwarding;
  const canResetSimulator = isRunning || isFastForwarding;

  return (
    <Flex height="100%" direction="column" p="4">
      <Heading mb="4">Controls</Heading>
      <Grid columns="3" gap="4">
        <Button
          size={{
            lg: "2",
            md: "1",
          }}
          disabled={canPauseStartSimulation}
          onClick={() => {
            if (canPauseStartSimulation) {
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
          size={{
            lg: "2",
            md: "1",
          }}
          disabled={canFastForward}
          onClick={() => {
            if (canFastForward) {
              return;
            }

            dispatch(setIsFastForwarding());
          }}
        >
          Fast Forward
        </Button>
        <Button
          size={{
            lg: "2",
            md: "1",
          }}
          disabled={canResetSimulator}
          onClick={() => {
            if (canResetSimulator) {
              return;
            }
            dispatch(resetSimulation());
          }}
        >
          Reset
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
