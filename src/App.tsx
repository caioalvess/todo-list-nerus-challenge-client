import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Logo from "./components/design/Logo";
import logo from "./assets/logo_nerus.svg";
function App() {
  return (
    <BrowserRouter>
      <Logo url={logo} className="mt-8 max-w-[150px]" />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
