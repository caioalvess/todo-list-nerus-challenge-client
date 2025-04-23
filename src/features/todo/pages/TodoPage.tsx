import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoAddForm";
import TodoFilterInput from "../components/TodoFilterInput";
import TodoFilterButtons from "../components/TodoFilterButtons";
import TodoCount from "../components/TodoCount";
import TodoPagination from "../components/TodoPagination";
import TodoListSkeleton from "../components/TodoListSkeleton";
import { useTodosContext } from "../context/useTodosContext";
import Logo from "../../../components/design/Logo";
import logo from "../../../assets/images/logo_nerus.svg";
import Wrapper from "@/components/design/Wrapper";

export default function TodoPage() {
  const { loading } = useTodosContext();

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
