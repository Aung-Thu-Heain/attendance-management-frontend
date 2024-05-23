import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "admin-layout",
      component: () => import("@layouts/AdminLayout.vue"),
      meta: {
        isAuthRoute: true,
      },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("@dashboards/AdminDashboard.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "login",
      component: () => import("@layouts/AuthLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("@components/auth/Login.vue"),
        },
      ],
    },
  ],
});

export default router;
