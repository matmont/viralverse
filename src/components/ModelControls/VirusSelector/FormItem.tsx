import { ReactNode } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";
import { IVirus } from "../../../types/virus";

export interface IFormItemProps {
  formKey: keyof IVirus;
  label: string;
  render: (hasError: boolean) => ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  renderValue?: (value: string | number) => string;
}

const FormItem = ({
  formKey,
  hasError,
  errorMessage,
  label,
  render,
  renderValue,
}: IFormItemProps) => {
  const { getValues } = useFormContext<IVirus>();
  const value = getValues()[formKey];
  return (
    <Box mb="4">
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>
      <Flex align="center" gap="4">
        <Box flexGrow="1">{render(hasError ?? false)}</Box>
        {renderValue && <Text>{renderValue(value)}</Text>}
      </Flex>
      {hasError && (
        <Text size="1" weight="light" color="red">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default FormItem;
