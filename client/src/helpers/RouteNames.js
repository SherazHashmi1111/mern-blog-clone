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