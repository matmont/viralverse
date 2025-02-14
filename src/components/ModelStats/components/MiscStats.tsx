import { Box, Card, Grid, Popover, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type TStatItemProps = {
  value: number | string;
  label: string;
  infoText?: string;
};

const StatItem = ({ label, value, infoText }: TStatItemProps) => {
  return (
    <Card style={{ flex: 1, position: "relative" }}>
      {!!infoText && (
        <Box position="absolute" top="2" right="2">
          <Popover.Root>
            <Popover.Trigger>
              <InfoCircledIcon width="20px" height="15px" />
            </Popover.Trigger>
            <Popover.Content size="2" maxWidth="400px">
              <Text as="p" trim="both" size="2">
                {infoText}
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Box>
      )}
      <Text as="div" size="2">
        {label}
      </Text>
      <Text
        as="div"
        size={{
          md: "6",
          lg: "8",
        }}
        weight="bold"
        color="gray"
      >
        {value}
      </Text>
    </Card>
  );
};

const MiscStats = () => {
  const {
    cityArea,
    nOfHouses,
    nOfOffices,
    nOfSchools,
    population,
    outbreakSizePercent,
  } = useSelector((state: RootState) => state.simulation);

  return (
    <Grid gap="4" columns="3">
      <StatItem label="Population" value={population} />
      <StatItem
        label="City Area"
        value={cityArea}
        infoText={`Number of cells that compose the (squared) grid. All the other demographic data (population size, for example) are computed directly from this initial size of the environment.`}
      />
      <StatItem label="Houses" value={nOfHouses} />
      <StatItem label="Offices" value={nOfOffices} />
      <StatItem label="Schools" value={nOfSchools} />
      <StatItem
        label="Outbreak"
        value={`${outbreakSizePercent * 100} %`}
        infoText={` Percentage of individuals that will start as infected from the beginning.`}
      />
    </Grid>
  );
};

export default MiscStats;
