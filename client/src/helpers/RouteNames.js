export const RouteIndex = "/"
export const RouteLogin = "/login"
export const RouteSignup = "/signup"
export const RouteProfile = "/profile"
export const RouteAddCategory = "/add-category"
export const RouteCategories = "/categories"
export const RouteEditCategory = (categoryid) => {
  if (categoryid) {
    return `/category/edit/${categoryid}`;
  } else {
    return "/category/edit/:categoryid";
  }
};

//Blog Routes
export const RouteBlog = "/blog";
export const RouteAddBolg = "/blog/add";
export const RouteUpdateBlog = (blogid) => {
  if (blogid) {
    return `/blog/edit/${blogid}`;
  } else {
    return "/blog/edit/:blogid";
  }
};

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return "/blog/:category/:blog";
  } else {
    return `/blog/${category}/${blog}`;
  }
};

export const RouteCategoryBlogs = (category) => {
  if (!category) {
    return "/blog/:category";
  } else {
    return `/blog/${category}`;
  }
};