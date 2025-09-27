import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteAddBolg, RouteAddCategory, RouteBlog, RouteBlogDetails, RouteCategories, RouteCategoryBlogs, RouteEditCategory, RouteIndex, RouteLogin, RouteProfile, RouteSignup, RouteUpdateBlog } from "./helpers/RouteNames";
import Layout from "./components/layout/Layout";
import Index from "./../src/pages/Index.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
import EditCategory from "./pages/category/EditCategory";
import BlogDetails from "./pages/blog/BlogDetails";
import AddBlog from "./pages/blog/AddBlog";
import ByCategoryBlogs from "./pages/blog/ByCategoryBlogs";
import UpdateBlog from "./pages/blog/UpdateBlog";
import SingleBlogDetails from "./pages/blog/SingleBlogDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route  path={RouteProfile} element={<Profile />} />
          <Route  path={RouteAddCategory} element={<AddCategory />} />
          <Route  path={RouteCategories} element={<CategoryDetails />} />
          <Route  path={RouteEditCategory()} element={<EditCategory />} />

           <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteAddBolg} element={<AddBlog />} />
            <Route path={RouteCategoryBlogs()} element={<ByCategoryBlogs />} />
            <Route path={RouteUpdateBlog()} element={<UpdateBlog />} />
        </Route>
          <Route path={RouteLogin} element={<Login />} />
          <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
