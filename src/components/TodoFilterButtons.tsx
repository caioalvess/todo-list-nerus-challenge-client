import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function TodoFilterButtons() {
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

  return (
    <div className="mb-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
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
