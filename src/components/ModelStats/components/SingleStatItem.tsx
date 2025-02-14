import {
  DashIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { detectTrend } from "./utils";

export type TSingleStatItemProps = {
  label: string;
  value: number | string;
  historyOfValues?: number[];
  increaseColor?: string;
  decreaseColor?: string;
};

const SingleStatItem = ({
  historyOfValues,
  label,
  value,
  decreaseColor,
  increaseColor,
}: TSingleStatItemProps) => {
  const trend = detectTrend(historyOfValues ?? [], 14);
  const isIncreasing = trend > 0;
  const isDecreasing = trend < 0;
  const isTheSame = trend == 0;

  return (
    <Flex justify="between" width="100%" flexGrow="1">
      <Text
        size={{
          lg: "4",
          md: "2",
        }}
        style={{ flex: 1 }}
      >
        {label}:{" "}
      </Text>
      {historyOfValues != null && isIncreasing && (
        <TriangleUpIcon color={increaseColor} />
      )}
      {historyOfValues != null && isDecreasing && (
        <TriangleDownIcon color={decreaseColor} />
      )}
      {historyOfValues != null && isTheSame && <DashIcon />}
      <Text
        size={{
          lg: "5",
          md: "3",
        }}
        weight="medium"
      >
        {value}
      </Text>
    </Flex>
  );
};

export default SingleStatItem;
