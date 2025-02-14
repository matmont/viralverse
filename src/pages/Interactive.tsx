import { Box, Grid } from "@radix-ui/themes";
import ModelControls from "../components/ModelControls/ModelControls";
import ModelSimulator from "../components/ModelSimulator/ModelSimulator";
import ModelStats from "../components/ModelStats/ModelStats";

const Interactive = () => {
  return (
    <Grid
      columns="3"
      gap="3"
      rows="repeat(2, 1fr)"
      width="auto"
      minHeight={"100vh"}
      maxHeight={"100vh"}
    >
      <Box
        id="model-container"
        gridColumnStart="1"
        gridColumnEnd="3"
        gridRowStart="1"
        gridRowEnd="3"
        overflow="auto"
      >
        <ModelSimulator />
      </Box>
      <Box>
        <ModelStats />
      </Box>
      <Box>
        <ModelControls />
      </Box>
    </Grid>
  );
};

export default Interactive;
