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
  const { deleteTodo } = useTodosContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleDeleteTodo() {
    setLoading(true);
    deleteTodo(todoId).then(() => {
      setLoading(false);
      setOpen(false);
    });
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
          <AlertDialogAction onClick={handleDeleteTodo} disabled={loading}>
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
