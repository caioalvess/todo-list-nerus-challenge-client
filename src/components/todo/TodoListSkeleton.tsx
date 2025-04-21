import { Skeleton } from "../ui/skeleton";

type Props = {
  numberOfItems?: number;
};

export default function TodoListSkeleton({ numberOfItems = 6 }: Props) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-4 mb-10">
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-24 w-full rounded-md" />
        </li>
      ))}
    </ul>
  );
}
