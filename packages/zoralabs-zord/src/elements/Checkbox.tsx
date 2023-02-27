import {
  checkboxBase,
  checkboxIndicator,
  labelText,
  svg,
  indeterminate,
} from "./Checkbox.css";
import { Paragraph } from "./Text";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

export interface CheckboxProps {
  label?: string;
  name: string;
  id: string;
  checked?: CheckboxPrimitive.CheckedState | boolean;
  className?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: Dispatch<SetStateAction<CheckboxPrimitive.CheckedState>>;
  onClick?: () => void;
}

export function Checkbox({
  label,
  id,
  name,
  className,
  checked,
  defaultChecked = false,
  disabled = false,
  onClick,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <Paragraph
      as="label"
      size="sm"
      htmlFor={id}
      {...props}
      className={[
        "zord-checkbox",
        labelText({
          disabled,
          label: !!label,
        }),
        className,
      ]}
    >
      <CheckboxPrimitive.Root
        className={clsx(checkboxBase, className)}
        checked={!!checked}
        disabled={!!disabled}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        id={id}
        name={name}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={checkboxIndicator}>
          {checked === "indeterminate" && (
            <DividerHorizontalIcon className={indeterminate} />
          )}
          {checked === true && <CheckIcon className={svg} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </Paragraph>
  );
}
