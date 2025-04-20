import { Check, Clock } from "lucide-react";

export const statusOptions = [
  { value: "false", label: "Pending", color: "text-red-500", icon: <Clock /> },
  {
    value: "true",
    label: "Completed",
    color: "text-green-500",
    icon: <Check />,
  },
];
