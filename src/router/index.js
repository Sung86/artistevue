import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
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
    component: () => import("@/views/Account"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/my-art-works",
    name: "MyArtWorks",
    component: () => import("@/views/MyArtWorks"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/post-an-art",
    name: "PostAnArt",
    component: () => import("@/views/PostAnArt"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/my-orders",
    name: "MyOrders",
    component: () => import("@/views/MyOrders"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/sign-out",
    name: "SignOut",
    component: () => import("@/views/SignOut"),
    meta: {
      requiredAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isUserSignedIn = await store.getters["user/getIsSignIn"];
  if (to.meta.requiredAuth && !isUserSignedIn) {
    let snackBar = JSON.parse(
      JSON.stringify(store.getters["snackBar/getSnackBar"])
    );
    snackBar.message = "You are required to sign in first!";
    snackBar.colour = "error";
    snackBar.timeout = "5000";
    snackBar.isShow = true;
    store.commit("snackBar/setSnackBar", snackBar);
    next({ name: "Landing" });
  } else {
    next();
  }
});
export default router;
