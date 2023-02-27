import { RadioButton } from "./RadioButton";
import * as styles from "./RadioButtonGroup.css";
import { RadioGroupProps, Root } from "@radix-ui/react-radio-group";
import clsx, { ClassValue } from "clsx";
import React from "react";

interface RadioButtonGroupProps extends RadioGroupProps {
  items: Omit<RadioButtonProps, "id">[];
  buttonClassName?: ClassValue;
}

export interface RadioButtonProps {
  id: string;
  value: string;
  label?: string;
  disabled?: boolean;
}

export function RadioButtonGroup({
  className,
  buttonClassName,
  items,
  ...props
}: RadioButtonGroupProps) {
  return (
    <Root
      defaultValue={props.defaultValue}
      className={clsx(
        "zord-radiobuttongroup",
        styles.radioButtonGroup,
        styles.row,
        className
      )}
      {...props}
    >
      {items.map((item, idx) => (
        <RadioButton
          key={idx}
          className={clsx("zord-radiobuttongroup-item", buttonClassName)}
          id={`r-${idx}`}
          label={item.label}
          {...item}
        />
      ))}
    </Root>
  );
}
