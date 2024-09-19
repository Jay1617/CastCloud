import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserData } from "./context/User";
import Loading from "./components/Loading";

function App() {
  const { loading, isAuth } = UserData();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          // element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          // element={isAuth ? <Navigate to="/" /> : <Register />}
          element = {<Register />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
