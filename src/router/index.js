import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from '@/stores/auth';

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
      meta: {
        isAuthRoute: true
      }
    },
    {
      path: "/dashboard",
      meta:{
        requiresAuth:true
      },
      component: () => import("@layouts/AdminLayout.vue"),
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

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (to.meta.requiresAuth && !loginStore.isLoggedIn) {
    next({ name: 'login' });
  }

  if (
    (to.meta.isAuthRoute && loginStore.isLoggedIn) ||
    (to.name === 'login' && loginStore.isLoggedIn)
  ) {
    // Redirect to Super Admin dashboard
    next({ name: 'admin-users' });
    return;
  }
  next();
});


export default router;
