<template>
  <v-card class="overflow-hidden">
    <v-app-bar color="white" elevate-on-scroll fixed>
      <v-app-bar-nav-icon
        @click="(showSideBar = !showSideBar), $emit('emitSideBar', showSideBar)"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor:pointer" @click="routeTo('Landing')">
        Artistevue
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-btn class="text-capitalize" text @click="routeTo('SignUp')">
          Sign up
        </v-btn>
        <v-btn
          class="text-capitalize"
          text
          @click="
            (showSignInForm = !showSignInForm),
              $emit('emitSignInForm', showSignInForm)
          "
        >
          Sign In
        </v-btn>
      </div>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  props: ["bindSideBar", "bindSignInForm"],
  data: () => ({
    showSideBar: false,
    showSignInForm: false
  }),
  watch: {
    bindSideBar(newValue) {
      this.showSideBar = newValue;
    },
    bindSignInForm(newValue) {
      this.showSignInForm = newValue;
    }
  },
  methods: {
    routeTo(routeName) {
      if (this.$route.name != routeName) this.$router.push({ name: routeName });
    }
  }
};
</script>
