import { Flex, Label } from "./";
import {
  sliderContainer,
  sliderEyebrow,
  sliderLabel,
  sliderRange,
  sliderRoot,
  sliderThumb,
  sliderTrack,
} from "./Slider.css";
import { Eyebrow } from "./Text";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React, { useCallback, useEffect, useMemo, useState } from "react";

// DAIN TODO: add composing prop

export interface SliderProps extends SliderPrimitive.SliderProps {
  range?: boolean;
  showLabel?: boolean;
  unitName?: string;
  unitNamePlural?: string;
  showInlineUnits?: boolean;
  selectedValue?: any;
}

export function Slider({
  name,
  range,
  showLabel = false,
  showInlineUnits = false,
  unitName,
  unitNamePlural,
  selectedValue,
  ...props
}: SliderProps) {
  const [formattedValue, setFormattedValue] = useState<
    number | string | undefined
  >(undefined);
  const [formattedSecondValue, setFormattedSecondValue] = useState<
    number | string | undefined
  >(undefined);

  const spacer = useMemo(() => (unitName === "%" ? "" : " "), [unitName]);

  const formatValueWithUnit = useCallback(
    (val: number) => `${val}${spacer}${val > 1 ? unitNamePlural : unitName}`,
    [spacer, unitName, unitNamePlural]
  );

  useEffect(() => {
    if (selectedValue && selectedValue.length === 1) {
      const value = formatValueWithUnit(selectedValue[0] as number);
      setFormattedValue(value);
    } else if (selectedValue && selectedValue.length === 2) {
      const valueA = formatValueWithUnit(selectedValue[0] as number);
      setFormattedValue(valueA);
      const valueB = formatValueWithUnit(selectedValue[1] as number);
      setFormattedSecondValue(valueB);
    }
  }, [formatValueWithUnit, selectedValue]);

  return (
    <Flex
      direction="column"
      gap="x2"
      className={[`zord-slider`, sliderContainer, props.className]}
      w="100%"
    >
      {selectedValue && (
        <Flex
          w="100%"
          justify={
            selectedValue && selectedValue.length === 2
              ? "space-between"
              : "center"
          }
        >
          <Label size="md" className={sliderLabel}>
            {formattedValue}
          </Label>
          {formattedSecondValue && (
            <Label size="md" className={sliderLabel}>
              {formattedSecondValue}
            </Label>
          )}
        </Flex>
      )}
      <Flex w="100%">
        {showLabel && !showInlineUnits && (
          <Eyebrow
            className={sliderEyebrow({
              disabled: !!props.disabled,
              offsetRight: true,
            })}
          >
            {props.min}
          </Eyebrow>
        )}
        <SliderPrimitive.Root {...props} className={sliderRoot} name={name}>
          <SliderPrimitive.Track className={sliderTrack}>
            <SliderPrimitive.Range className={sliderRange} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className={sliderThumb} />
          <SliderPrimitive.Thumb className={sliderThumb} />
        </SliderPrimitive.Root>
        {showLabel && !showInlineUnits && (
          <Eyebrow
            className={sliderEyebrow({
              disabled: !!props.disabled,
              offsetLeft: true,
            })}
          >
            {props.max}
          </Eyebrow>
        )}
      </Flex>
      {showInlineUnits && (
        <Flex justify="space-between" w="100%">
          <Eyebrow className={sliderEyebrow({ disabled: !!props.disabled })}>
            {showInlineUnits
              ? formatValueWithUnit(props.min as number)
              : props.min}
          </Eyebrow>
          <Eyebrow className={sliderEyebrow({ disabled: !!props.disabled })}>
            {showInlineUnits
              ? formatValueWithUnit(props.max as number)
              : props.max}
          </Eyebrow>
        </Flex>
      )}
    </Flex>
  );
}
