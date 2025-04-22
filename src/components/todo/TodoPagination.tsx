import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useTodosContext } from "@/context/todo/useTodosContext";

export default function TodoPagination() {
  const { page, totalPages, limit } = useTodosContext();
  const { updateFilter } = useQueryFilter<{
    page: string;
    limit: string;
  }>();

  const handlePageChange = (newPage: number) => {
    updateFilter({ page: String(newPage) });
  };

  const handleLimitChange = (value: string) => {
    updateFilter({ limit: value, page: "1" });
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex items-center gap-8 flex-wrap justify-center md:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm">Lines per page</span>
          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="6" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="40">40</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm">
          {page} of {totalPages === 0 ? "1" : totalPages}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <Button
            variant="outline"
            onClick={() => handlePageChange(1)}
            disabled={Number(totalPages) <= 1}
            className="cursor-pointer"
          >
            <ChevronsLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={Number(page) >= totalPages}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(totalPages === 0 ? 1 : totalPages)}
            disabled={Number(page) >= totalPages}
            className="cursor-pointer"
          >
            <ChevronsRight className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
