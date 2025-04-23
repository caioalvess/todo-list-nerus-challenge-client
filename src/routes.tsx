import { Route } from "react-router-dom";
import TodoPage from "./features/todo/pages/TodoPage";

export const Routes = () => {
  return (
    <>
      <Route path="/" element={<TodoPage />} />
    </>
  );
};

export default Routes;
