import { BrowserRouter, Routes, Route } from "react-router-dom";
import Docs from "./pages/Doc";
import "./styles/site.css";
import Home from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
