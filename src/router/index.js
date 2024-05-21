import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "admin-layout",
      component: () => import("../layout/AdminLayout.vue"),
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
  ],
});

export default router;
