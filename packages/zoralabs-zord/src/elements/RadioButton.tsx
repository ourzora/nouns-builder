import { indicator, radio, radioText } from "./RadioButton.css";
import { Text, TextProps } from "./Text";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";

export interface RadioButtonGroupProps {
  label?: string;
  name: string;
  defaultValue?: string;
}

export interface RadioButtonProps extends TextProps {
  id: string;
  value: string;
  label?: string;
  disabled?: boolean;
}

export function RadioButton({
  className,
  id,
  value,
  label,
  disabled,
  ...props
}: RadioButtonProps) {
  return (
    <Text
      as="label"
      className={["zord-radiobutton", radioText({ disabled }), className]}
      aria-label={label}
      variant="label-md"
      htmlFor={id}
      {...props}
    >
      <RadioGroupPrimitive.Item
        className={radio}
        value={value}
        id={id}
        disabled={!!disabled}
      >
        <RadioGroupPrimitive.Indicator className={indicator} />
      </RadioGroupPrimitive.Item>

      {label}
    </Text>
  );
}
