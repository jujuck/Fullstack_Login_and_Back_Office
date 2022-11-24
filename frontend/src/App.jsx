import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "@context/User";
import Cars from "@pages/Cars";
import Home from "@pages/Home";
import Login from "@pages/Login";

import "./App.css";
import NavBar from "@components/Navigation/NavBar";
import Administration from "@pages/Administration";
import ProtectedRoute from "@pages/Layout/ProtectedRoute";

function App() {
  const userContext = useContext(User.UserContext);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={userContext.user} handleUser={userContext.handleUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<Cars />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Administration"
            element={
              <ProtectedRoute user={userContext.user}>
                <Administration />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
