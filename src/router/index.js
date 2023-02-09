import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      redirect: { name: "home" },
      component: () => import("../views/layouts/MainLayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/categories/:category",
          name: "categories",
          component: () => import("../views/Categories.vue"),
        },
        {
          path: "/:title/:id",
          name: "product",
          component: () => import("../views/ProductPage.vue"),
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/auth/Login.vue"),
    },
  ],
});

export default router;
