import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import SingleStatItem from "./SingleStatItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const VirusCharacteristics = () => {
  const { selectedVirus, viruses } = useSelector(
    (state: RootState) => state.viruses
  );
  const virus = viruses.find((v) => v.id === selectedVirus);
  if (!virus) return <></>;

  const {
    probabilityOfDeath,
    probabilityOfImmunity,
    probabilityOfInfection,
    probabilityOfSymptoms,
    timeOfDiseaseDays,
    timeOfIncubationDays,
  } = virus;

  return (
    <>
      <Flex direction="column" flexGrow="1" align="stretch">
        <Flex align="center" justify="between">
          <Text size="4" weight="medium">
            <CrumpledPaperIcon /> Virus
          </Text>
        </Flex>
        <SingleStatItem label="Death" value={`${probabilityOfDeath * 100} %`} />
        <SingleStatItem
          label="Immunity"
          value={`${probabilityOfImmunity * 100} %`}
        />{" "}
        <SingleStatItem
          label="Infectivity"
          value={`${probabilityOfInfection * 100} %`}
        />{" "}
        <SingleStatItem
          label="Symptoms"
          value={`${probabilityOfSymptoms * 100} %`}
        />{" "}
        <SingleStatItem label="Duration" value={`${timeOfDiseaseDays} days`} />
        <SingleStatItem
          label="Incubation"
          value={`${timeOfIncubationDays} days`}
        />
      </Flex>
    </>
  );
};

export default VirusCharacteristics;
