import { useTodos } from "../hooks/useTodos";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import Wrapper from "../components/design/Wrapper";
import TodoFilterInput from "../components/TodoFilterInput";
import TodoFilterButtons from "../components/TodoFilterButtons";
import TodoCount from "../components/TodoCount";
import TodoPagination from "../components/TodoPagination";
import TodoListSkeleton from "../components/TodoListSkeleton";

export type Filter = "all" | "active" | "completed";

export default function Home() {
  const {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    goToPage,
    page,
    totalPages,
    limit,
    changeLimit,
    pendingTodos,
    completedTodos,
    filterTodos,
  } = useTodos();

  return (
    <Wrapper className="min-h-screen ">
      <div className="w-screen h-screen container pt-10  max-w-2/3 px-4">
        <TodoForm onAdd={addTodo} isLoading={loading} />
        <TodoFilterInput onFilterChange={filterTodos} />
        <TodoFilterButtons onFilterChange={filterTodos} />
        {loading ? (
          <TodoListSkeleton numberOfItems={limit} />
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
        <div className="flex items-center gap-2 text-xs pb-4 text-gray-500 justify-start">
          <TodoCount pending={pendingTodos} completed={completedTodos} />
        </div>
        <div className="flex justify-end items-center border-t border-gray-100 pb-4">
          <TodoPagination
            limit={limit}
            page={page}
            totalPages={totalPages}
            onLimitChange={changeLimit}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </Wrapper>
  );
}
