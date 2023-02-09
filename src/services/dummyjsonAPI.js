import API from "./API";

export default {
  // products
  getAllProducts() {
    return API().get("products?limit=100");
  },

  getProductById(productId) {
    return API().get(`products/${productId}`);
  },

  // categories
  getAllCategories() {
    return API().get("products/categories");
  },

  getProductsByCategory(category) {
    return API().get(`products/category/${category}`);
  },

  // reviews
  getReviewsByPostId(postId) {
    return API().get(`comments/post/${postId}`);
  },

  // auth
  login(values) {
    return API().post("auth/login", {
      username: values.username,
      password: values.password,
    });
  },

  register(values) {
    return API().post("users/add", {
      username: values.username,
      password: values.password,
      email: "newuser@gmail.com",
      firstName: "New",
      lastName: "user",
      gender: "Male",
      image: "awd",
    });
  },
};
