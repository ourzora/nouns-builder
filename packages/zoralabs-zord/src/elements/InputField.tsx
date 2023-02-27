import { Box, BoxComponentProps, Flex, Label, Text, textVariants } from "./";
import { FieldAnnotation } from "./FieldAnnotation";
import { Icon, IconProps } from "./Icon";
import * as styles from "./InputField.css";
import React, { WheelEvent, forwardRef, useCallback, useState } from "react";
import { PolymorphicForwardRefExoticComponent } from "react-polymorphic-types";

export interface InputFieldProps extends BoxComponentProps<"input"> {
  name: string;
  value?: string | number;
  placeholder?: string;
  label?: string;
  affix?: string;
  type?: "text" | "number";
  step?: number;
  min?: number;
  max?: number;
  icon?: IconProps["id"];
  className?: string;
  disabled?: boolean;
  indentFields?: boolean;
  error?: string;
  canError?: boolean;
  description?: string;
  descriptionVariant?: keyof typeof textVariants["variant"];
  lowProfile?: boolean;
  headerElement?: React.ReactNode;
  affixElement?: React.ReactNode;
  variant?: "sm" | "lg";
  inlineButton?: React.ReactNode;
  disableWheelEvent?: boolean;
}

export function InnerInputField(
  {
    value,
    label,
    name,
    icon,
    type = "text",
    description,
    error,
    canError = false,
    step,
    min,
    max,
    className,
    placeholder = "",
    affix,
    lowProfile,
    descriptionVariant,
    indentFields = true,
    disabled = false,
    onFocus,
    onBlur,
    headerElement,
    affixElement,
    variant = "sm",
    inlineButton,
    disableWheelEvent = type === "number",
    ...props
  }: InputFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [focused, setFocused] = useState<boolean>(false);
  const focusStyle = lowProfile ? styles.focusedLowProfile : styles.focused;
  const large = variant === "lg";

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus, setFocused]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur, setFocused]
  );

  return (
    <Flex
      className={["zord-inputfield", styles.inputField, className]}
      direction="column"
      cursor={disabled ? "not-allowed" : "auto"}
    >
      {!!(label || headerElement) && (
        <Flex justify="space-between">
          <Label
            ml={indentFields ? "x3" : "x0"}
            as="label"
            size="sm"
            htmlFor={name}
            color="secondary"
          >
            {label}
          </Label>

          {headerElement}
        </Flex>
      )}

      <Flex gap="x3">
        <Flex
          className={[
            styles.inputContainer,
            focused && focusStyle,
            error && styles.error,
          ]}
          w="100%"
          pos="relative"
          align="center"
          h={large ? "x16" : "x10"}
          px="x3"
          gap={large ? "x2" : "x1"}
        >
          {icon && <Icon id={icon} size={large ? "lg" : "md"} />}

          <Box
            className={[styles.inputFieldBaseInput, large && styles.inputLarge]}
            as="input"
            ref={ref}
            step={step}
            min={min}
            max={max}
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            disabled={!!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onWheel={
              disableWheelEvent
                ? (e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()
                : undefined
            }
            {...props}
          />

          {affix && (
            <Text
              className={[large && styles.inputLarge]}
              variant="paragraph-sm"
              color="secondary"
            >
              {affix}
            </Text>
          )}

          {affixElement}
        </Flex>
        {inlineButton}
      </Flex>

      {(error || description || canError) && (
        <FieldAnnotation
          className={className}
          description={description}
          error={error}
          indentFields={indentFields}
          variant={descriptionVariant}
          minH={canError ? "x6" : "unset"}
        />
      )}
    </Flex>
  );
}

export const InputField: PolymorphicForwardRefExoticComponent<
  InputFieldProps,
  "input"
> = forwardRef(InnerInputField);
