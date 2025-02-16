//@ts-ignore
import Animator from "https://code.agentscript.org/src/Animator.js";
//@ts-ignore
import TwoDraw from "https://code.agentscript.org/src/TwoDraw.js";
//@ts-ignore
import ColorMap from "https://code.agentscript.org/src/ColorMap.js";
import EpidemyModel from "./model";
import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNumberOfHouses,
  setNumberOfOffices,
  setNumberOfSchools,
  setPopulation,
} from "../store/slices/simulationSlice";
import { RootState } from "../store/store";
import { DURATION } from "../const";

let viralLoadColorMap = ColorMap.basicColorMap([
  [184, 167, 167],
  [204, 139, 139],
  [207, 105, 105],
  [209, 65, 65],
  [219, 13, 13],
]);

export type TUseInitModelProps = {
  showSimulation: boolean;
  simulatorContainerRef?: RefObject<HTMLDivElement | null>;
};

const useInitModel = ({
  showSimulation,
  simulatorContainerRef,
}: TUseInitModelProps) => {
  const dispatch = useDispatch();
  const [animator, setAnimator] = useState<any>(null);
  const [model, setModel] = useState<any>(null);
  const [view, setView] = useState<any>(null);

  const { selectedVirus, viruses } = useSelector(
    (state: RootState) => state.viruses
  );
  const {
    cityArea,
    reset,
    outbreakSizePercent,
    isRunning,
    maskUsagePercentage,
    lockDownPercentage,
    isFastForwarding,
    isStarted,
  } = useSelector((state: RootState) => state.simulation);

  const createView = (model: any, simulatorContainerRef: HTMLDivElement) => {
    return new TwoDraw(model, {
      div: "modelDiv",
      width: simulatorContainerRef.getBoundingClientRect().width * 0.7,
      height: simulatorContainerRef.getBoundingClientRect().width * 0.7,
      drawOptions: {
        patchesColor: (patch: any) => {
          switch (patch.breed.name) {
            case "road":
              return viralLoadColorMap.scaleColor(patch.viralLoad, 0, 1);
            case "house":
              return "yellow";
            case "school":
              return "purple";
            case "office":
              return "blue";
            default:
              return ColorMap.LightGray.randomColor();
          }
        },
        turtlesSize: 1,
        turtlesColor: (turtle: any) => {
          if (
            turtle.status === "infected-sym" ||
            turtle.status === "infected-asy"
          ) {
            return "#ba2222";
          }

          if (turtle.status === "susceptible") {
            return "#333333";
          }

          if (turtle.status === "exposed") {
            return "#ffc021";
          }

          if (turtle.status === "immune") {
            return "#12ff3d";
          }
          switch (turtle.breed.name) {
            case "young":
              return "#cfcfcf";
            case "elderly":
              return "#9c9c9c";
            case "adult":
              return "#5c5c5c";
            default:
              return "";
          }
        },
        turtlesShape: "person",
      },
    });
  };

  useLayoutEffect(() => {
    if (showSimulation && !simulatorContainerRef?.current) {
      return;
    }

    animator?.stop();
    model?.reset();

    setAnimator(null);
    setModel(null);
    setView(null);

    const UNITS = Math.round(Math.sqrt(cityArea) / 2);
    const worldOptions = {
      minX: -UNITS,
      maxX: UNITS,
      minY: -UNITS,
      maxY: UNITS,
    };
    const virus = viruses.find((v) => v.id === selectedVirus);
    if (!virus) {
      return;
    }
    const newModel = new EpidemyModel(
      worldOptions,
      virus,
      outbreakSizePercent,
      maskUsagePercentage,
      lockDownPercentage
    );
    newModel.setup();

    const view = showSimulation
      ? createView(newModel, simulatorContainerRef!.current!)
      : null;

    if (showSimulation) {
      view.draw();
    }

    const newAnimator = new Animator(
      () => {
        newModel.step();
        if (showSimulation) {
          view.draw();
        }
      },
      DURATION,
      60
    );
    newAnimator.stop();

    setAnimator(newAnimator);
    setModel(newModel);
    setView(view);

    dispatch(setNumberOfHouses(newModel.nOfHouses));
    dispatch(setNumberOfOffices(newModel.nOfOffices));
    dispatch(setNumberOfSchools(newModel.nOfSchools));
    dispatch(setPopulation((newModel as any).turtles.length));
  }, [
    cityArea,
    reset,
    selectedVirus,
    outbreakSizePercent,
    showSimulation,
    maskUsagePercentage,
    lockDownPercentage,
  ]);

  async function skipToEndCallback() {
    animator.stop();
    let batchSize = Math.floor(DURATION / 500);

    while (model.ticks < DURATION) {
      for (let i = 0; i < batchSize && model.ticks < DURATION; i++) {
        model.step();
      }
      view.draw();
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    view.draw();
  }

  useEffect(() => {
    if (isStarted && !animator.isRunning() && isFastForwarding) {
      skipToEndCallback();
      return;
    }

    if (isRunning && !animator.isRunning()) {
      animator?.start();
    } else {
      animator?.stop();
    }
  }, [animator, isRunning, isFastForwarding, isStarted]);
};

export default useInitModel;
