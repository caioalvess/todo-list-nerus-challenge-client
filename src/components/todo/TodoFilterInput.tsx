import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "../../hooks/useDebounce";
import { useQueryFilter } from "../../hooks/useQueryFilter";
import React from "react";

export default function TodoFilterInput() {
  const { debounce } = useDebounce();
  const { filters, updateFilter, removeFilter } = useQueryFilter<{
    title: string;
  }>();
  const search = filters.title || "";

  const [value, setValue] = React.useState<string>(search || "");

  function handleChange(value: string) {
    setValue(value);
    debounce(() => {
      if (!value) {
        removeFilter("title");
      } else {
        updateFilter("title", value);
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
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="pl-9 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}
