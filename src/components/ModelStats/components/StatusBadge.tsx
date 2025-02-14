import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Flex, Text } from "@radix-ui/themes";

const StatusBadge = () => {
  const { isRunning, isStarted, isFinished, isFastForwarding } = useSelector(
    (state: RootState) => state.simulation
  );
  const isStopped = isStarted && !isRunning;
  let label = "";
  let color = "";

  if (isRunning) {
    label = "Running";
    color = "#009924";
  }

  if (isStopped) {
    label = "Paused";
    color = "#ffc517";
  }

  if (!isStarted) {
    label = "Not Started";
    color = "#d12a00";
  }

  if (isFinished) {
    label = "Finished";
    color = "#008db0";
  }

  if (isFastForwarding) {
    label = "Fast Forwarding";
    color = "#a505ab";
  }
  return (
    <Flex
      display="inline-flex"
      px="2"
      style={{
        backgroundColor: color,
        color: "white",
        borderRadius: 6,
      }}
    >
      <Text weight="regular" size="2">
        {label}
      </Text>
    </Flex>
  );
};

export default StatusBadge;
