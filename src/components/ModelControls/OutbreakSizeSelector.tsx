import { Flex, Popover, Slider, Text } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setOutbreakSizePercent } from "../../store/slices/simulationSlice";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const OutbreakSizeSelector = () => {
  const dispatch = useDispatch();
  const outbreakSize = useSelector(
    (state: RootState) => state.simulation.outbreakSizePercent
  );
  const isStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  return (
    <Flex align="center" gap="4" gridColumnStart="1" gridColumnEnd="4">
      <Flex align="center" width="140px" gap="4" justify="between">
        <Text>Outbreak</Text>
        <Text weight="medium" size="4">
          {outbreakSize * 100} %
        </Text>
      </Flex>
      <Slider
        disabled={isStarted}
        step={10}
        style={{ flex: 1 }}
        value={[outbreakSize * 100]}
        onValueChange={(value) => {
          dispatch(setOutbreakSizePercent(value[0] / 100));
        }}
        variant="surface"
      />
      <Popover.Root>
        <Popover.Trigger>
          <InfoCircledIcon width="30px" height="20px" />
        </Popover.Trigger>
        <Popover.Content size="2" maxWidth="400px">
          <Text as="p" trim="both" size="2">
            Percentage of individuals that will start as infected from the
            beginning.
          </Text>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default OutbreakSizeSelector;
