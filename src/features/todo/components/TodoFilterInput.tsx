import { Search, X } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useDebounce } from "../../../hooks/useDebounce";
import { useQueryFilter } from "../../../hooks/useQueryFilter";
import React, { useRef } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";

export default function TodoFilterInput() {
  const { debounce } = useDebounce();
  const { filters, updateFilter, removeFilter } = useQueryFilter<{
    title: string;
    page: string;
  }>();
  const search = filters.title || "";

  const [value, setValue] = React.useState<string>(search || "");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(value: string) {
    setValue(value);
    debounce(() => {
      if (!value) {
        removeFilter("title");
      } else {
        updateFilter({ title: value, page: "1" });
      }
    }, 500);
  }

  function clearInput() {
    setValue("");
    removeFilter("title");
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center space-x-2 mb-4">
      {/* Search Input */}
      <div
        className={cn(
          "relative flex-1 transition-all duration-200",
          value.length > 0 ? "pr-12" : "pr-0"
        )}
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for a title..."
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="pl-9 border-gray-200 focus:border-gray-300 focus:ring-gray-200 w-[calc(100%+3rem)]"
        />
      </div>

      {/* Clear Button */}
      <div
        className={cn(
          "transition-opacity duration-150",
          value.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Button onClick={clearInput}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
