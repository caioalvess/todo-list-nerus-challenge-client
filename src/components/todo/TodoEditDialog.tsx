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
};

export default function TodoEditDialog({ children, todo }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TodoEditForm todo={todo} />
      </DialogContent>
    </Dialog>
  );
}
