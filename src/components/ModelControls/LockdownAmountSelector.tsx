import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Slider, Popover, Text } from "@radix-ui/themes";
import { setLockdownPercentage } from "../../store/slices/simulationSlice";

const LockdownAmountSelector = () => {
  const dispatch = useDispatch();
  const lockDownPercentage = useSelector(
    (state: RootState) => state.simulation.lockDownPercentage
  );
  const isStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  return (
    <Flex align="center" gap="4" gridColumnStart="1" gridColumnEnd="4">
      <Flex align="center" width="140px" gap="4" justify="between">
        <Text>Lockdown</Text>
        <Text weight="medium" size="4">
          {lockDownPercentage}
        </Text>
      </Flex>
      <Slider
        disabled={isStarted}
        style={{ flex: 1 }}
        value={[lockDownPercentage * 100]}
        onValueChange={(value) => {
          dispatch(setLockdownPercentage(value[0] / 100));
        }}
        variant="surface"
      />
      <Popover.Root>
        <Popover.Trigger>
          <InfoCircledIcon width="30px" height="20px" />
        </Popover.Trigger>
        <Popover.Content size="2" maxWidth="400px">
          <Text as="p" trim="both" size="2">
            Probability that an infected <strong>symptomatic</strong> individual
            will stay at home in the morning.
          </Text>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default LockdownAmountSelector;
