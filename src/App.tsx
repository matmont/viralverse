import ChartSection from "./components/ChartSection/ChartSection";
import InfoSection from "./components/InfoSection/InfoSection";
import { Box, Flex, Grid } from "@radix-ui/themes";
import ModelControls from "./components/ModelControls/ModelControls";
import ModelSimulator from "./components/ModelSimulator/ModelSimulator";
import ModelStats from "./components/ModelStats/ModelStats";

function App() {
  return (
    <>
      <Grid
        columns={{
          md: "3",
          initial: "1",
        }}
        gap="3"
        rows={{
          md: "repeat(1, 1fr)",
          initial: "2",
        }}
        width="auto"
        minHeight={"100vh"}
        maxHeight={"100vh"}
      >
        <Box
          id="model-container"
          gridColumnStart="1"
          gridColumnEnd={{
            md: "3",
            initial: "2",
          }}
          gridRowStart="1"
          gridRowEnd="2"
          overflow="auto"
        >
          <ModelSimulator />
        </Box>
        <Box
          id="model-controls-stats"
          gridColumnStart={{
            md: "3",
            initial: "2",
          }}
          gridColumnEnd={{ md: "4", initial: "1" }}
          gridRowStart={{
            md: "1",
            initial: "2",
          }}
          gridRowEnd={{
            md: "2",
            initial: "3",
          }}
          overflow="auto"
        >
          <Box>
            <ModelStats />
          </Box>
          <Box>
            <ModelControls />
          </Box>
        </Box>
      </Grid>
      <Flex position="absolute" left="6" bottom="6" direction="column" gap="4">
        <InfoSection />
        <ChartSection />
      </Flex>
    </>
  );
}

export default App;
