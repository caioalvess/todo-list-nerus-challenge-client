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

export default function Todo() {
  const { loading } = useTodosContext();

  return (
    <div className="w-screen h-screen container md:max-w-6xl px-4">
      <header className="mt-10 mb-8">
        <Logo width={150} url={logo} />
      </header>

      <section className="mb-6">
        <TodoForm />
      </section>

      <section className="mb-6">
        <TodoFilterInput />
        <TodoFilterButtons />
      </section>

      <section className="mb-6">
        {loading ? <TodoListSkeleton /> : <TodoList />}
      </section>

      <footer className="text-xs text-gray-500">
        <div className="flex items-center gap-2 pb-4">
          <TodoCount />
        </div>
        <div className="flex justify-end items-center border-t border-gray-100 pb-4">
          <TodoPagination />
        </div>
      </footer>
    </div>
  );
}
