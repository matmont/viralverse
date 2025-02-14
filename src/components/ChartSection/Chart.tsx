import { Box, Button, Flex } from "@radix-ui/themes";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { setChartSectionOpen } from "../../store/slices/uiSlice";
import { RootState } from "../../store/store";
import { DownloadIcon } from "@radix-ui/react-icons";
import { saveToSvg } from "./util";

const Chart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const dialogBodyRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(0);
  const {
    historyOfInfected,
    historyOfImmunized,
    historyOfSusceptible,
    historyOfDeaths,
    historyOfExposed,
  } = useSelector((state: RootState) => state.simulation);
  const isChartOpen = useSelector(
    (state: RootState) => state.ui.chartSectionOpen
  );
  const dispatch = useDispatch();

  const data = [];
  for (let i = 0; i < historyOfImmunized.length; i++) {
    data.push({
      day: i,
      Infected: historyOfInfected[i],
      Susceptible: historyOfSusceptible[i],
      Immunized: historyOfImmunized[i],
      Exposed: historyOfExposed[i],
      Deaths: historyOfDeaths[i],
    });
  }

  useLayoutEffect(() => {
    if (!dialogBodyRef.current) {
      return;
    }
    setChartHeight(dialogBodyRef.current.getBoundingClientRect().height * 0.9);
  }, [isChartOpen]);

  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      minHeight="100vh"
      minWidth="100vw"
      align="center"
      direction="column"
      justify="center"
      p="8"
      style={{ backgroundColor: "#00000044" }}
      onClick={() => dispatch(setChartSectionOpen(false))}
    >
      <Flex
        onClick={(e) => e.stopPropagation()}
        p="4"
        style={{ backgroundColor: "white", borderRadius: 10, flex: 1 }}
        width="80%"
        height="80%"
        direction="column"
        justify="between"
        align="end"
      >
        <Box ref={dialogBodyRef} width="100%" style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height={chartHeight} ref={chartRef}>
            <LineChart data={data}>
              <Legend />
              <Line
                type="monotone"
                dataKey="Infected"
                stroke="#f02424"
                dot={false}
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="Susceptible"
                stroke="#3675eb"
                dot={false}
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="Immunized"
                stroke="#0acf4f"
                dot={false}
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="Exposed"
                stroke="#e39b00"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Deaths"
                stroke="#4a4a4a"
                dot={false}
              />
              <XAxis dataKey="day" fontSize="12" />
              <YAxis fontSize="12" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Flex align="center" gap="3">
          <Button
            onClick={() => {
              if (!chartRef.current) {
                return;
              }
              saveToSvg(chartRef.current);
            }}
          >
            <DownloadIcon />
            Export to SVG
          </Button>
          <Button
            color="red"
            onClick={() => {
              dispatch(setChartSectionOpen(false));
            }}
          >
            Close
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chart;
