import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./View/Home";
import Login from "./View/Login";
import Register from "./View/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
