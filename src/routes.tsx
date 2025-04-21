import { Route } from "react-router-dom";
import Home from "./pages/Home";

export const Routes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
    </>
  );
};

export default Routes;
