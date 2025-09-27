import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteAddCategory, RouteCategories, RouteEditCategory, RouteIndex, RouteLogin, RouteProfile, RouteSignup } from "./helpers/RouteNames";
import Layout from "./components/layout/Layout";
import Index from "./../src/pages/Index.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
import EditCategory from "./pages/category/EditCategory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route  path={RouteProfile} element={<Profile />} />
          <Route  path={RouteAddCategory} element={<AddCategory />} />
          <Route  path={RouteCategories} element={<CategoryDetails />} />
          <Route  path={RouteEditCategory()} element={<EditCategory />} />
        </Route>
          <Route path={RouteLogin} element={<Login />} />
          <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
