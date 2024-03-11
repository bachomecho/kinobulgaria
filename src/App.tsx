import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

export default function App() {
  return (
    <div className="wrapper">
      <nav>
        <ul>
          <li>
            <a href="/"></a>
          </li>
        </ul>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
