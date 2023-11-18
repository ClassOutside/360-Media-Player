import { Container } from "@coconut-xr/koestlich";
import { N } from "@mobily/ts-belt";
import { ComponentPropsWithoutRef, useState } from "react";

type IconButtonProps = ComponentPropsWithoutRef<typeof Container> & {
  active?: boolean;
  size?: "medium" | "small" | "large";
};

function IconButton({ active, size = "medium", ...props }: IconButtonProps) {
  const [hoverCount, setHoverCount] = useState(0);
  const radius = { small: 20, medium: 24, large: 28 }[size];

  return (
    <Container
      height={2 * radius}
      width={2 * radius}
      borderRadius={radius}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      backgroundOpacity={active ? 0.2 : hoverCount > 0 ? 0.1 : 0}
      onPointerEnter={() => setHoverCount(N.add(1))}
      onPointerLeave={() => setHoverCount(N.subtract(1))}
      {...props}
    />
  );
}

export default IconButton;
