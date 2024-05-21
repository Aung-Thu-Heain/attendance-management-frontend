import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@dashboards/AdminDashboard.vue"),
      meta: {
        isAuthRoute: true,
      },
    },
  ],
});

export default router;
