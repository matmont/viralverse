import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Popover, Slider, Text } from "@radix-ui/themes";
import { setCityArea } from "../../store/slices/simulationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AVAILABLE_CITY_AREAS = [
  1600, 1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601, 2704,
  2809, 2916, 3025, 3136, 3249, 3364, 3481, 3600,
];

const CityAreaSelector = () => {
  const cityArea = useSelector((state: RootState) => {
    return state.simulation.cityArea;
  });
  const isStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  const dispatch = useDispatch();
  return (
    <Flex align="center" gap="4" gridColumnStart="1" gridColumnEnd="4">
      <Flex align="center" width="140px" gap="4" justify="between">
        <Text>City Area</Text>
        <Text weight="medium" size="4">
          {cityArea}
        </Text>
      </Flex>
      <Slider
        disabled={isStarted}
        step={1}
        min={0}
        max={AVAILABLE_CITY_AREAS.length - 1}
        style={{ flex: 1 }}
        value={[AVAILABLE_CITY_AREAS.indexOf(cityArea)]}
        onValueChange={(value) => {
          dispatch(setCityArea(AVAILABLE_CITY_AREAS[+value]));
        }}
        variant="surface"
      />
      <Popover.Root>
        <Popover.Trigger>
          <InfoCircledIcon width="30px" height="20px" />
        </Popover.Trigger>
        <Popover.Content size="2" maxWidth="400px">
          <Text as="p" trim="both" size="2">
            Number of cells that compose the (squared) grid. All the other
            demographic data (population size, for example) are computed
            directly from this initial size of the environment.
          </Text>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default CityAreaSelector;
