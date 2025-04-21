import { cn } from "../../lib/utils";
import Wrapper from "./Wrapper";

type Props = {
  url: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({ url, className }: Props) {
  return (
    <Wrapper>
      <div className={cn("flex items-center", className)}>
        <img src={url} alt="Logo" className="mr-2" />
      </div>
    </Wrapper>
  );
}
