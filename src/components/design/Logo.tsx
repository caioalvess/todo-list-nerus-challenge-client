import { cn } from "../../lib/utils";
import Wrapper from "./Wrapper";

type Props = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export default function Logo({
  url,
  width = 40,
  height = 40,
  alt = "Logo",
  className,
}: Props) {
  return (
    <Wrapper>
      <div className={cn("flex items-center", className)}>
        <img
          src={url}
          alt={alt}
          width={width}
          height={height}
          className="mr-2 object-contain"
        />
      </div>
    </Wrapper>
  );
}
