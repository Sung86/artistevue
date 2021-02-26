import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/views/Landing")
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account")
  },
  {
    path: "/my-art-works",
    name: "MyArtWorks",
    component: () => import("@/views/MyArtWorks")
  },
  {
    path: "/post-an-art",
    name: "PostAnArt",
    component: () => import("@/views/PostAnArt")
  },
  {
    path: "/my-orders",
    name: "MyOrders",
    component: () => import("@/views/MyOrders")
  },
  {
    path: "/sign-out",
    name: "SignOut",
    component: () => import("@/views/SignOut")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
