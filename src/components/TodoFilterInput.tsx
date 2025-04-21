import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  onFilterChange: (
    filter:
      | {
          [key: string]: string | number | boolean;
        }
      | undefined
  ) => void;
};

export default function TodoFilterInput({ onFilterChange }: Props) {
  const { debounce } = useDebounce();

  function handleFilterChange(value: string) {
    debounce(() => {
      if (value === "") {
        onFilterChange(undefined);
      } else {
        onFilterChange({ title: value });
      }
    }, 500);
  }

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for a title..."
          //   value={searchQuery}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="pl-9 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}
