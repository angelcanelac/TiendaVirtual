import { createRouter, createWebHashHistory } from "vue-router";
import { AuthStore } from "@/stores/user";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Auth.vue"),
    },
    {
      path: "/shop",
      name: "Shop",
      component: () => import("@/views/Shop.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = AuthStore();

  if (!authStore.isAuthenticated && to.name !== "index") {
    next({ name: "index" });
  } else {
    next();
  }
});
export default router;
