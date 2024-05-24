import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@pages/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@components/auth/Login.vue"),
    },
    {
      path: "/dashboard",
      name: "admin-dashboard",
      component: () => import("@layouts/AdminLayout.vue"),
      meta: {
        isAuthRoute: true,
      },
      children: [
        {
          path: "users",
          name: "admin-users",
          component: () => import("@dashboards/Users.vue"),
        },
        {
          path: "roles",
          name: "admin-roles",
          component: () => import("@dashboards/Roles.vue"),
        },
      ],
    },
  ],
});

export default router;
