import { useTodosContext } from "@/context/todo/useTodosContext";
import { Skeleton } from "../../../components/ui/skeleton";

export default function TodoListSkeleton() {
  const { limit } = useTodosContext();

  return (
    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {Array.from({ length: limit }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-24 w-full rounded-md" />
        </li>
      ))}
    </ul>
  );
}
