import { Flex, Popover, Slider, Text } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setMaskUsage } from "../../store/slices/simulationSlice";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const MaskUsageSelector = () => {
  const dispatch = useDispatch();
  const maskUsagePercentage = useSelector(
    (state: RootState) => state.simulation.maskUsagePercentage
  );
  const isStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  return (
    <Flex align="center" gap="4" gridColumnStart="1" gridColumnEnd="4">
      <Flex align="center" width="140px" gap="4" justify="between">
        <Text>Mask Usage</Text>
        <Text weight="medium" size="4">
          {maskUsagePercentage}
        </Text>
      </Flex>
      <Slider
        disabled={isStarted}
        style={{ flex: 1 }}
        value={[maskUsagePercentage * 100]}
        onValueChange={(value) => {
          dispatch(setMaskUsage(value[0] / 100));
        }}
        variant="surface"
      />
      <Popover.Root>
        <Popover.Trigger>
          <InfoCircledIcon width="30px" height="20px" />
        </Popover.Trigger>
        <Popover.Content size="2" maxWidth="400px">
          <Text as="p" trim="both" size="2">
            Percentage of individuals that will use the mask. The mask is{" "}
            <strong>not</strong> to be considered as a defense against getting
            infected. Instead, it will reduce the amount of viral load left
            around from the infected individuals.
          </Text>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default MaskUsageSelector;
