import { annotation, annotationText } from "./FieldAnnotation.css";
import { Flex, FlexProps } from "./Flex";
import { Text, textVariants } from "./Text";
import React, { ReactNode } from "react";

export interface FieldAnnotationProps extends FlexProps {
  error?: string;
  description?: string | ReactNode;
  indentFields?: boolean;
  variant?: keyof typeof textVariants["variant"];
}

export function FieldAnnotation({
  description,
  error,
  className,
  indentFields = true,
  variant = "paragraph-xs",
  ...props
}: FieldAnnotationProps) {
  return (
    <Flex
      direction="column"
      className={["zord-fieldannotation", annotation, className]}
      {...props}
    >
      {error && (
        <Text
          className={annotationText({
            error: !!error,
            indentFields: !!indentFields,
          })}
          variant={variant}
        >
          {error}
        </Text>
      )}
      {description && (
        <Text
          className={annotationText({ indentFields: !!indentFields })}
          variant={variant}
        >
          {description}
        </Text>
      )}
    </Flex>
  );
}
