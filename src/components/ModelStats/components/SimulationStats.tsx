import { Flex, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MINUTES_PER_STEP } from "../../../const";
import SingleStatItem from "./SingleStatItem";
import { BarChartIcon } from "@radix-ui/react-icons";

const SimulationStats = () => {
  const currentStep = useSelector(
    (state: RootState) => state.simulation.currentStep
  );
  const startingDateTimeMs = useSelector(
    (state: RootState) => state.simulation.startingDateTimeMs
  );
  const {
    nOfDeath,
    nOfInfected,
    nOfInfectedAsympt,
    nOfInfectedSympt,
    nOfExposed,
    nOfSusceptible,
    nOfImmune,
    historyOfInfected,
    historyOfExposed,
  } = useSelector((state: RootState) => state.simulation);
  const currentDate = new Date(startingDateTimeMs ?? "");
  currentDate.setMinutes(
    currentDate.getMinutes() + currentStep * MINUTES_PER_STEP
  );
  return (
    <>
      <Flex direction="column" flexGrow="1">
        <Flex align="center" justify="between">
          <Text size="4" weight="medium">
            <BarChartIcon /> Numbers
          </Text>
        </Flex>
        <SingleStatItem label="Deaths" value={nOfDeath} />
        <SingleStatItem
          label="Exposed"
          value={nOfExposed}
          historyOfValues={historyOfExposed}
          decreaseColor="#07b825"
          increaseColor="#cc2b0a"
        />
        <SingleStatItem
          label="Infected"
          value={nOfInfected}
          historyOfValues={historyOfInfected}
          decreaseColor="#07b825"
          increaseColor="#cc2b0a"
        />{" "}
        <SingleStatItem label="Symptomatic" value={nOfInfectedSympt} />{" "}
        <SingleStatItem label="Asymptomatic" value={nOfInfectedAsympt} />{" "}
        <SingleStatItem label="Susceptible" value={nOfSusceptible} />
        <SingleStatItem label="Immune" value={nOfImmune} />
      </Flex>
    </>
  );
};

export default SimulationStats;
