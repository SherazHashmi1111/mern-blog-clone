import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteIndex, RouteLogin, RouteSignup } from "./helpers/RouteNames";
import Layout from "./components/layout/Layout";
import Index from "./../src/pages/Index.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteLogin} element={<Login />} />
          <Route path={RouteSignup} element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
