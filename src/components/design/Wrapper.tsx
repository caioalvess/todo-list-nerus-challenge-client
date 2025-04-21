import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
};

export default function Wrapper({
  children,
  className = "",
  direction = "column",
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white",
        `flex-${direction}`,
        className
      )}
    >
      {children}
    </div>
  );
}
