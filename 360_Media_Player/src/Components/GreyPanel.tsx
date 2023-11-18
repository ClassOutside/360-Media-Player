import { Container } from "@coconut-xr/koestlich";
import React, { ReactNode } from 'react';

export function GreyPanel(props: {
  children?: ReactNode;
  backgroundColor?: string;
  backgroundOpacity?: number;
  borderColor?: string;
  borderOpacity?: number;
  border?: number;
  borderBend?: number;
  flexGrow: number;
  flexShrink: number;
  borderRadiusTopRight: number;
  borderRadiusBottomRight: number;
  borderRadiusTopLeft: number;
  borderRadiusBottomLeft: number;
  padding?: number;
  gapColumn?: number;
  flexDirection?: any;
}): JSX.Element {
  const {
    children,
    backgroundColor = "#888",
    backgroundOpacity = 0.8,
    borderColor = "#888",
    borderOpacity = 0.8,
    border = 4,
    borderBend = 0.3,
    flexGrow,
    flexShrink,
    borderRadiusTopRight,
    borderRadiusBottomRight,
    borderRadiusTopLeft,
    borderRadiusBottomLeft,
    gapColumn = 8,
    padding = 8,
    flexDirection = "row"
  } = props;

  return (
    <Container
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      borderColor={borderColor}
      borderOpacity={borderOpacity}
      border={border}
      borderBend={borderBend}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      borderRadiusTopRight={borderRadiusTopRight}
      borderRadiusBottomRight={borderRadiusBottomRight}
      borderRadiusTopLeft={borderRadiusTopLeft}
      borderRadiusBottomLeft={borderRadiusBottomLeft}
      padding={padding}
      gapColumn={gapColumn}
      flexDirection={flexDirection}
    >
      {children}
    </Container>
  );
}
