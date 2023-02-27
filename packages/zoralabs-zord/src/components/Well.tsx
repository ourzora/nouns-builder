import { Flex, Label, Stack, StackProps } from "../elements";
import { well } from "./Well.css";
import React from "react";

export interface WellProps extends StackProps {
  label?: string;
}

export function Well({ label, className, children, ...props }: WellProps) {
  return (
    <Stack
      className={["zord-well", well, className]}
      borderColor="border"
      borderWidth="normal"
      borderStyle="solid"
      borderRadius="normal"
      p="x4"
      {...props}
    >
      {label && (
        <Flex>
          <Label size="md">{label}</Label>
        </Flex>
      )}
      {children}
    </Stack>
  );
}
