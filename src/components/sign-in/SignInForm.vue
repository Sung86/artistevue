<template>
  <v-card outlined rounded="xl" style="border:4px solid grey">
    <v-form ref="form" lazy-validation class="pa-5">
      <v-row justify="end">
        <v-btn icon @click="hideSignInForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        label="Passowrd"
        @click:append="showPassword = !showPassword"
        required
      />
      <div class="mt-5">
        <v-btn color="success" width="100%" @click="signIn()" class="mb-5">
          Sign In
        </v-btn>
        Don't have an account?
        <a @click="routeTo('SignUp'), hideSignInForm()">Create an account</a>
      </div>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    email: null,
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],
    password: null,
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 8 && v.length <= 20) ||
        "Password must be between 8 and 20 characters"
    ],
    showPassword: false
  }),

  methods: {
    hideSignInForm() {
      this.$emit("emitSignInForm", false);
    },
    signIn() {
      if (this.validate()) {
        const loginDetails = { email: this.email, password: this.password };
        this.$store
          .dispatch("firebase/authentication/signIn", {
            loginDetails
          })
          .then(async response => {
            if (response.status === "success") {
              await this.$store.commit("user/setIsSignIn", true);
              const user = JSON.parse(JSON.stringify(response.user));
              await this.$store.commit("user/setAccountInfo", user);
              this.reset();
              this.hideSignInForm();
              this.routeTo("Landing");
              alert("login success");
            } else {
              alert("login fail. Invalid account");
            }
          });
      } else {
        //error
        console.log("invalid");
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      return this.$refs.form.reset();
    },

    routeTo(routeName) {
      this.reset();
      if (this.$route.name != routeName) this.$router.push({ name: routeName });
    }
  }
};
</script>

<style></style>
