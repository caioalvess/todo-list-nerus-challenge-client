import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusOptions } from "@/constants/todo.const";

type Props = {
  title: string;
  date: string;
  updatedAt: string;
  status: "pending" | "completed";
  description: string;
  children: React.ReactNode;
};

export default function TodoViewDialog({
  title,
  date,
  updatedAt,
  status,
  description,
  children,
}: Props) {
  const formatDate = (data: Date) => {
    return format(data, "MMMM dd, yyyy 'at' HH:mm");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Full task details</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "px-3 py-1",
                statusOptions.find(
                  (option) =>
                    option.value ===
                    String(status === "completed" ? "true" : "false")
                )?.styles
              )}
            >
              {
                statusOptions.find(
                  (option) =>
                    option.value ===
                    String(status === "completed" ? "true" : "false")
                )?.icon
              }
              {
                statusOptions.find(
                  (option) =>
                    option.value ===
                    String(status === "completed" ? "true" : "false")
                )?.label
              }
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Creation date
              </span>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(new Date(date))}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Last Update
              </span>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(new Date(updatedAt))}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              Description
            </span>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm whitespace-pre-wrap">
                {description ? description : "No description"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
