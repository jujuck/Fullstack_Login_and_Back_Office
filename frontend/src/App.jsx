import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cars from "@pages/Cars";
import Home from "@pages/Home";
import Login from "@pages/Login";

import "./App.css";
import NavBar from "@components/Navigation/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<Cars />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
