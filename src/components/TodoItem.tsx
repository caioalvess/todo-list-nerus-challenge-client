import { useState } from "react";
import { Todo } from "../types/Todo.type";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "./ui/badge";
import { statusOptions } from "@/constants/todo.const";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
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
    return format(date, "dd MMM", { locale: ptBR });
  };

  const toggleTask = (id: string) => {
    onToggle(id);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-2 px-3 border rounded-md">
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
                  className="text-gray-400 text-sm"
                >
                  {todo.description}
                </span>
              ) : (
                <span className="text-gray-400 text-sm">Sem descrição</span>
              )}
            </span>
          </div>
        )}

        <div className="flex items-center justify-start mt-2 gap-1 flex-wrap">
          <Badge
            variant="outline"
            className="text-[10px] py-0 h-5 bg-gray-50 text-gray-500"
          >
            <Calendar className="h-2.5 w-2.5 mr-1" />
            {formatDate("2025-04-20T20:55:00.000Z")}
          </Badge>

          <Badge
            variant="destructive"
            className="text-[10px] py-0 h-5 bg-gray-50 text-gray-500"
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
      </div>

      <div className="flex gap-1">
        {isEditing && (
          <Button size="sm" onClick={handleEdit}>
            Salvar
          </Button>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(todo.id)}
          className="h-6 w-6 text-gray-400 hover:text-gray-600 hover:bg-transparent p-0 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </li>
  );
}
