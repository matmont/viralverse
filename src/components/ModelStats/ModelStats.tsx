import { Flex, Heading } from "@radix-ui/themes";
import MiscStats from "./components/MiscStats";
import StatusBadge from "./components/StatusBadge";
import SimulationStats from "./components/SimulationStats";
import VirusCharacteristics from "./components/VirusCharacteristics";
import ProgressBar from "./components/ProgressBar";

const ModelStats = () => {
  return (
    <Flex height="100%" direction="column" p="4" overflow="auto">
      <Heading mb="4">
        Simulation Stats <StatusBadge />
      </Heading>
      <MiscStats />
      <ProgressBar />
      <Flex justify="between" gap="8">
        <SimulationStats />
        <VirusCharacteristics />
      </Flex>
    </Flex>
  );
};

export default ModelStats;
