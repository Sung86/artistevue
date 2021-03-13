<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="center">
          <p
            :class="
              isOnSmAndUp
                ? 'text-h2 font-weight-medium'
                : 'text-h3 font-weight-medium'
            "
          >
            Create Your Account
          </p>
        </v-row>
      </v-col>
      <v-col cols="12">
        <SignUpForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    window: {
      width: 0, // in px
      height: 0 // in px
    }
  }),
  created() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  computed: {
    isOnSmAndUp() {
      return this.window.width >= 600;
    }
  },

  components: {
    SignUpForm: () => import("@/components/sign-up/SignUpForm")
  },
  methods: {
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

<style></style>
