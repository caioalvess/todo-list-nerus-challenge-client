import { Todo } from "../../../services/todo/types";
import { Button } from "../../../components/ui/button";
import { Calendar, Check, Edit, Info, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Badge } from "../../../components/ui/badge";
import { statusOptions } from "@/constants/todo.const";
import { cn } from "@/lib/utils";
import TodoViewDialog from "../components/TodoViewDialog";
import TodoEditDialog from "./TodoEditDialog";
import TodoDeleteDialog from "./TodoDeleteDialog";
import { useTodosContext } from "@/context/todo/useTodosContext";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { toggleTodo } = useTodosContext();

  const statusOption = statusOptions.find(
    (option) => option.value === String(todo.completed)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd", { locale: enUS });
  };

  const renderTaskDetails = () => (
    <div className="flex flex-col">
      <span
        className={cn(
          "flex-1 truncate max-w-[170px] block",
          todo.completed && "line-through text-gray-500"
        )}
      >
        {todo.title}
      </span>
      <span
        className={cn(
          "text-gray-400 text-sm truncate max-w-[200px] block",
          todo.completed && "line-through text-gray-500"
        )}
      >
        {todo.description || "No description"}
      </span>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-1">
      <TodoViewDialog
        title={todo.title}
        date={todo.createdAt}
        updatedAt={todo.updatedAt}
        status={todo.completed ? "completed" : "pending"}
        description={todo.description ?? ""}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-blue-500 hover:text-blue-600 hover:bg-blue-100 p-0 "
        >
          <Info className="h-3 w-3" />
        </Button>
      </TodoViewDialog>
      <TodoEditDialog todo={todo}>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-gray-500 hover:text-gray-600 hover:bg-gray-100 p-0 "
        >
          <Edit className="h-3 w-3" />
        </Button>
      </TodoEditDialog>
      <TodoDeleteDialog
        todoId={todo.id}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-100 p-0 "
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </TodoDeleteDialog>
    </div>
  );

  return (
    <li className="flex flex-col border rounded-md">
      <div className="flex items-center justify-between gap-2 py-2 px-3">
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "h-6 w-6 rounded-full ",
            todo.completed
              ? "bg-gray-100 text-gray-600 border-gray-200"
              : "border border-gray-200"
          )}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed && <Check className="h-3 w-3" />}
        </Button>

        <div className="flex-1 ml-2">{renderTaskDetails()}</div>

        {renderActionButtons()}
      </div>

      <div className="flex items-center justify-start pb-3 pl-12 gap-1">
        <Badge
          variant="outline"
          className="text-[10px] py-0 h-5 bg-gray-50 text-gray-500"
        >
          <Calendar className="h-2.5 w-2.5 mr-1" />
          {formatDate(todo.createdAt)}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] py-0 h-5 bg-gray-50",
            statusOption?.styles
          )}
        >
          {statusOption?.icon}
          {statusOption?.label}
        </Badge>
      </div>
    </li>
  );
}
