import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Search from "./pages/Search";

function App() {
  const { loading, isAuth } = UserData();

  if (loading) {
    return <Loading />;
  }

  // console.log(isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuth ? <Admin /> : <Navigate to="/login" />}
        />

        <Route
          path="/search"
          element={isAuth ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/playlist"
          element={isAuth ? <PlayList /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <Register />}
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
