import { Flex, Avatar, AlertDialog, Button } from "@radix-ui/themes";
import { setChartSectionOpen } from "../../store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ChartIcon from "../../icons/ChartIcon";

const ChartOpenButton = () => {
  const dispatch = useDispatch();
  const isSimulationStarted = useSelector(
    (state: RootState) => state.simulation.isStarted
  );
  const isSimulationRunning = useSelector(
    (state: RootState) => state.simulation.isRunning
  );
  const canOpenChart = !!isSimulationStarted && !isSimulationRunning;

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Flex
            align="center"
            justify="center"
            width="80px"
            style={{
              cursor: canOpenChart ? "pointer" : "auto",
              borderRadius: "50%",
              aspectRatio: 1,
              opacity: canOpenChart ? 1 : 0.2,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            onClick={(e) => {
              if (canOpenChart) {
                dispatch(setChartSectionOpen(true));
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <Avatar
              radius="full"
              size="6"
              color="blue"
              variant="solid"
              fallback={<ChartIcon />}
            />
          </Flex>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Chart not available</AlertDialog.Title>
          <AlertDialog.Description size="2">
            To have the chart enabled, you should first start a simulation.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button variant="solid">Gotcha</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default ChartOpenButton;
