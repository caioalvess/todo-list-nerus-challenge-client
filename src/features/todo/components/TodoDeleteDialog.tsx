import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useTodosContext } from "@/context/todo/useTodosContext";

type Props = {
  children: React.ReactNode;
  todoId: string;
  title?: string;
  description?: string;
};

export default function TodoDeleteDialog({
  children,
  todoId,
  title = "Delete Task",
  description = "Are you sure you want to delete this task? This action cannot be undone.",
}: Props) {
  const { deleteTodo } = useTodosContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteTodo = async () => {
    setLoading(true);
    try {
      await deleteTodo(todoId);
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodo} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
