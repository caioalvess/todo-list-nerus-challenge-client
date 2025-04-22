import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  bgColor?: string;
};

export default function Wrapper({
  children,
  className = "",
  direction = "column",
  justify = "center",
  align = "center",
  bgColor = "bg-white",
}: Props) {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `justify-${justify}`,
        `items-${align}`,
        bgColor,
        className
      )}
    >
      {children}
    </div>
  );
}
