import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ChartOpenButton from "./ChartOpenButton";
import Chart from "./Chart";

const ChartSection = () => {
  const isChartOpen = useSelector(
    (state: RootState) => state.ui.chartSectionOpen
  );

  return (
    <>
      <ChartOpenButton />
      {isChartOpen && <Chart />}
    </>
  );
};

export default ChartSection;
