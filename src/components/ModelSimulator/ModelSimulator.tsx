import { Flex } from "@radix-ui/themes";
import { useRef } from "react";
import useInitModel from "../../abm/useInitModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./loader.css";

const ModelSimulator = () => {
  const simulatorContainerRef = useRef<HTMLDivElement>(null);
  const isFastForwarding = useSelector(
    (state: RootState) => state.simulation.isFastForwarding
  );
  useInitModel({
    simulatorContainerRef,
    showSimulation: true,
  });

  return (
    <Flex
      align="center"
      justify="center"
      height="100%"
      position="relative"
      ref={simulatorContainerRef}
    >
      {isFastForwarding && (
        <Flex
          position="absolute"
          justify="center"
          align="center"
          top="0"
          left="0"
          direction="column"
          width="100%"
          height="100%"
          style={{ backgroundColor: "#ffffffaa" }}
        >
          <div className="loader"></div>
        </Flex>
      )}
      <div id="modelDiv">
        <canvas></canvas>
      </div>
    </Flex>
  );
};
export default ModelSimulator;
