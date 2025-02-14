import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ETab } from "./types/ui";
import Interactive from "./pages/Interactive";
import ChartSection from "./components/ChartSection/ChartSection";
import InfoSection from "./components/InfoSection/InfoSection";
import { Flex } from "@radix-ui/themes";

function App() {
  const currentTab = useSelector((state: RootState) => state.ui.currentTab);
  return (
    <>
      {currentTab === ETab.INTERACTIVE && <Interactive />}
      <Flex position="absolute" left="6" bottom="6" direction="column" gap="4">
        <InfoSection />
        <ChartSection />
      </Flex>
    </>
  );
}

export default App;
