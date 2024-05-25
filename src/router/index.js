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
          component: () => import("@dashboards/User.vue"),
        },
        {
          path: "roles",
          name: "admin-roles",
          component: () => import("@dashboards/Role.vue"),
        },
        {
          path: "classes",
          name: "admin-classes",
          component: () => import("@dashboards/Class.vue"),
        },
        {
          path: "settings",
          name: "admin-settings",
          component: () => import("@dashboards/Setting.vue"),
        },
      ],
    },
  ],
});

export default router;
