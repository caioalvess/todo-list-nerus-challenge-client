import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoAddForm";
import TodoFilterInput from "../../components/todo/TodoFilterInput";
import TodoFilterButtons from "../../components/todo/TodoFilterButtons";
import TodoCount from "../../components/todo/TodoCount";
import TodoPagination from "../../components/todo/TodoPagination";
import TodoListSkeleton from "../../components/todo/TodoListSkeleton";
import { useTodosContext } from "@/context/todo/useTodosContext";
import Logo from "../design/Logo";
import logo from "../../assets/logo_nerus.svg";

export type Filter = "all" | "active" | "completed";

export default function Todo() {
  const { loading } = useTodosContext();

  return (
    <div className="w-screen h-screen container  md:max-w-6xl px-4">
      <Logo url={logo} className="mt-10 max-w-[150px] mb-8" />
      <TodoForm />
      <TodoFilterInput />
      <TodoFilterButtons />
      {loading ? <TodoListSkeleton /> : <TodoList />}
      <div className="flex items-center gap-2 text-xs pb-4 text-gray-500 justify-start">
        <TodoCount />
      </div>
      <div className="flex justify-end items-center border-t border-gray-100 pb-4">
        <TodoPagination />
      </div>
    </div>
  );
}
