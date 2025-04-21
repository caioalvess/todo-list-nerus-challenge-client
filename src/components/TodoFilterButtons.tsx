import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
  onFilterChange: (
    filter:
      | {
          [key: string]: string | number | boolean;
        }
      | undefined
  ) => void;
};

export default function TodoFilterButtons({ onFilterChange }: Props) {
  const [activeTab, setActiveTab] = React.useState("all");

  const filterOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "completed",
      label: "Completed",
    },
  ];

  const filters: Record<"all" | "pending" | "completed", boolean | undefined> =
    {
      all: undefined,
      pending: false,
      completed: true,
    };

  function handleFilterChange(value: "all" | "pending" | "completed") {
    setActiveTab(value);
    console.log("value", value);
    if (value === "all") {
      onFilterChange(undefined);
    } else {
      onFilterChange({ completed: filters[value] ?? false });
    }
  }

  return (
    <div className="mb-4">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) =>
          handleFilterChange(value as "all" | "pending" | "completed")
        }
      >
        <TabsList className="grid grid-cols-3 w-full">
          {filterOptions.map((filter) => {
            return (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
                className="w-full cursor-pointer"
              >
                {filter.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
