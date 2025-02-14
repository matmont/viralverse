import { Flex, Progress, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { MINUTES_PER_STEP, DURATION } from "../../../const";
import { differenceOfDays } from "./utils";
import { RootState } from "../../../store/store";

const ProgressBar = () => {
  const currentStep = useSelector(
    (state: RootState) => state.simulation.currentStep
  );
  const startingDateTimeMs = useSelector(
    (state: RootState) => state.simulation.startingDateTimeMs
  );
  const currentDate = new Date(startingDateTimeMs ?? "");
  currentDate.setMinutes(
    currentDate.getMinutes() + currentStep * MINUTES_PER_STEP
  );
  const elapsedDays = differenceOfDays(
    currentDate,
    new Date(startingDateTimeMs ?? "")
  );
  return (
    <Flex direction="column" my="4">
      <Flex mb="2" align="center" justify="between">
        <Text size="4" weight="medium">
          Progress
        </Text>
        <Text size="2">
          Elapsed Days:{" "}
          <strong>{startingDateTimeMs ? elapsedDays : "N/A"}</strong>
        </Text>
      </Flex>
      <Progress value={(currentStep / DURATION) * 100} />
    </Flex>
  );
};

export default ProgressBar;
