import { useState } from "react";
import { Todo } from "../../types/Todo.type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar, Check, Edit, Info, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { statusOptions } from "@/constants/todo.const";
import { cn } from "@/lib/utils";
import ActionDialog from "../AlertDialog";
import TodoViewDialog from "./TodoViewDialog";

type Props = {
  todo: Todo;
  loading?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
};

export default function TodoItem({
  todo,
  loading,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description || "");

  const handleEdit = () => {
    if (newTitle.trim() !== "") {
      onEdit(todo.id, newTitle, newDescription);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd", { locale: enUS });
  };

  const toggleTask = (id: string) => {
    onToggle(id);
  };

  function handleConfirm() {
    onDelete(todo.id);
  }

  return (
    <li className="flex flex-col  border rounded-md">
      <div className="flex items-center justify-between gap-2 py-2 px-3">
        <div>
          <Button
            size="icon"
            variant="ghost"
            className={`h-6 w-6 rounded-full cursor-pointer  ${
              todo.completed
                ? "bg-gray-100 text-gray-600 border-gray-200"
                : "border border-gray-200"
            }`}
            onClick={() => toggleTask(todo.id)}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </Button>
        </div>

        <div className="flex-1 ml-2">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                className="flex-1"
              />

              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                className="flex-1"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <span
                onDoubleClick={() => setIsEditing(true)}
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>

              <span>
                {todo.description ? (
                  <span
                    onDoubleClick={() => setIsEditing(true)}
                    className={`text-gray-400 text-sm truncate max-w-[160px] block ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.description}
                  </span>
                ) : (
                  <span
                    className={`text-gray-400 text-sm ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    No description
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-1">
          {isEditing ? (
            <div className="flex flex-col justify-between gap-5 ">
              <Button size="sm" onClick={handleEdit}>
                Save
              </Button>
            </div>
          ) : (
            <>
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
                  className="h-6 w-6 text-blue-500 hover:text-blue-600 hover:bg-blue-100 p-0 cursor-pointer"
                >
                  <Info className="h-3 w-3" />
                </Button>
              </TodoViewDialog>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 text-gray-500 hover:text-gray-600 hover:bg-gray-100 p-0 cursor-pointer"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <ActionDialog
                onConfirm={handleConfirm}
                loading={loading}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-100 p-0 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </ActionDialog>
            </>
          )}
        </div>
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
            statusOptions.find(
              (option) => option.value === String(todo.completed)
            )?.styles
          )}
        >
          {
            statusOptions.find(
              (option) => option.value === String(todo.completed)
            )?.icon
          }
          {
            statusOptions.find(
              (option) => option.value === String(todo.completed)
            )?.label
          }
        </Badge>
      </div>
    </li>
  );
}
