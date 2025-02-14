import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ETab } from "./types/ui";
import Interactive from "./pages/Interactive";
import ChartSection from "./components/ChartSection/ChartSection";

function App() {
  const currentTab = useSelector((state: RootState) => state.ui.currentTab);
  return (
    <>
      {currentTab === ETab.INTERACTIVE && <Interactive />}
      <ChartSection />
    </>
  );
}

export default App;
