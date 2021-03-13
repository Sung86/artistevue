<template>
  <v-app>
    <Header
      @emitSideBar="bindSideBar"
      @emitSignInForm="bindSignInForm"
      :bindSideBar="showSideBar"
      :bindSignInForm="showSignInForm"
    />
    <v-main class="pt-15">
      <SnackBar />
      <Loading />
      <Sidebar
        v-if="showSideBar"
        :showSideBar="showSideBar"
        @emitSideBar="bindSideBar"
        class="mx-auto"
      />
      <v-dialog
        v-model="showSignInForm"
        overlay-opacity="0.75"
        temporary
        class="pa-5"
        width="80vw"
        height="50vh"
      >
        <SignInForm @emitSignInForm="bindSignInForm" />
      </v-dialog>

      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  components: {
    Header: () => import("@/components/layouts/Header"),
    Footer: () => import("@/components/layouts/Footer"),
    Sidebar: () => import("@/components/layouts/Sidebar"),
    SnackBar: () => import("@/components/layouts/SnackBar"),
    Loading: () => import("@/components/layouts/Loading"),
    SignInForm: () => import("@/components/sign-in/SignInForm")
  },
  data: () => ({
    showSideBar: false,
    showSignInForm: false,
    window: {
      width: 0, // in px
      height: 0 // in px
    }
  }),
  computed: {
    isOnSmAndUp() {
      return this.window.width >= 600;
    }
  },
  methods: {
    bindSideBar(e) {
      this.showSideBar = e;
    },
    bindSignInForm(e) {
      this.showSignInForm = e;
    },
    handleWindowResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>
<style>
.text-shadow {
  text-shadow: -1px -1px 0 #827b7b80, 1px -1px 0 #827b7b80, -1px 1px 0 #827b7b80,
    1px 1px 0 #827b7b80;
}
* {
  font-family: "Pacifico";
}
</style>
