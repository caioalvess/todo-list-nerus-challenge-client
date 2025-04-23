import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodosProvider } from "./context/todo/TodosProvider";
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
