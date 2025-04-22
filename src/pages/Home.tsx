import { TodosProvider } from "@/context/todo/TodosProvider";
import Wrapper from "../components/design/Wrapper";
import Todo from "../components/todo";

export default function Home() {
  return (
    <TodosProvider>
      <Wrapper className="min-h-screen">
        <Todo />
      </Wrapper>
    </TodosProvider>
  );
}
