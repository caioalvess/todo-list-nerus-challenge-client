import React from "react";
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
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useTodosContext } from "@/context/todo/useTodosContext";

type props = {
  children: React.ReactNode;
  todoId: string;
  title?: string;
  description?: string;
};

export default function TodoDeleteDialog({
  children,
  todoId,
  title,
  description,
}: props) {
  const { deleteTodo, loading } = useTodosContext();
  const [open, setOpen] = React.useState(false);

  function handleDeleteTodo() {
    deleteTodo(todoId);
  }

  return (
    <AlertDialog defaultOpen={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodo}>
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Loading...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
