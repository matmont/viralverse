import { Flex, Select, Text, Box, Button, Dialog } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSelectedVirus } from "../../../store/slices/virusSlice";
import VirusForm from "./VirusForm";

const VirusSelector = () => {
  const dispatch = useDispatch();
  const { viruses } = useSelector((state: RootState) => state.viruses);
  const isStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  return (
    <Flex
      align="center"
      gridColumnStart="1"
      gridColumnEnd="4"
      gap="4"
      justify="between"
    >
      <Text size="2">Selected Virus</Text>
      <Box style={{ flex: 1, width: "100%" }}>
        <Select.Root
          disabled={isStarted}
          defaultValue={"base-virus"}
          onValueChange={(value) => {
            if (value === "add-virus") {
              return;
            }
            dispatch(setSelectedVirus(value));
          }}
        >
          <Select.Trigger style={{ flex: 1, width: "100%" }} />
          <Select.Content>
            <Select.Group>
              <Select.Label>Viruses</Select.Label>
              {viruses.map((virus) => {
                return (
                  <Select.Item key={virus.id} value={virus.id}>
                    {virus.name}
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Crate new virus</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="60vw" minWidth="450px">
          <VirusForm />
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};

export default VirusSelector;
