import { Check, Clock } from "lucide-react";

export const statusOptions = [
  {
    value: "false",
    label: "Pending",
    styles: "text-amber-900 border-amber-200 bg-amber-50",
    icon: <Clock />,
  },
  {
    value: "true",
    label: "Completed",
    styles: "text-emerald-700 border-emerald-200 bg-emerald-50",
    icon: <Check />,
  },
];
