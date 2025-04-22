import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TodoEditForm from "./TodoEditForm";
import { Todo } from "../../types/Todo.type";

type Props = {
  todo: Todo;
  children?: React.ReactNode;
  isLoading?: boolean;
  onEdit: (
    id: string,
    title: string,
    completed: boolean,
    description?: string
  ) => void;
};

export default function TodoEditDialog({
  children,
  todo,
  onEdit,
  isLoading,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TodoEditForm todo={todo} loading={isLoading} onEdit={onEdit} />
      </DialogContent>
    </Dialog>
  );
}
