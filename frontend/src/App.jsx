import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "@context/User";
import Cars from "@pages/Cars";
import Home from "@pages/Home";
import Login from "@pages/Login";

import "./App.css";
import NavBar from "@components/Navigation/NavBar";
import Administration from "@pages/Administration";

function App() {
  return (
    <BrowserRouter>
      <User.UserProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars/:id" element={<Cars />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Administration" element={<Administration />} />
          </Routes>
        </div>
      </User.UserProvider>
    </BrowserRouter>
  );
}

export default App;
