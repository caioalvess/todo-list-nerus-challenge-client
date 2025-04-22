import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useQueryFilter } from "../../hooks/useQueryFilter";

export default function TodoFilterButtons() {
  const { filters, updateFilter, removeFilter } = useQueryFilter<{
    completed: string;
    page: string;
  }>();

  const filterOptions = [
    { value: "", label: "All" },
    { value: "false", label: "Pending" },
    { value: "true", label: "Completed" },
  ];

  const activeFilter = filters.completed ?? "";

  const handleTabChange = (value: string) => {
    if (value === "") {
      updateFilter({ page: "1" });
      removeFilter("completed");
    } else {
      updateFilter({ page: "1", completed: value });
    }
  };

  return (
    <div className="mb-4">
      <Tabs value={activeFilter} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 w-full">
          {filterOptions.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="w-full cursor-pointer"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
