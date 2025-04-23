import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodosProvider } from "./features/todo/context/TodosProvider";
import TodoPage from "./features/todo/pages/TodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <TodosProvider>
              <TodoPage />
            </TodosProvider>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
