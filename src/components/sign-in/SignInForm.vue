<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
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
    valid: false,
    email: null,
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],
    password: null,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Min 8 characters"
    ],
    showPassword: false
  }),

  methods: {
    hideSignInForm() {
      this.$emit("emitSignInForm", false);
    },
    signIn() {
      if (this.validate()) {
        //sign in
        console.log("valid");
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
    // resetValidation() {
    //   return this.$refs.form.resetValidation();
    // },
    routeTo(routeName) {
      this.reset();
      if (this.$route.name != routeName) this.$router.push({ name: routeName });
    }
  }
};
</script>

<style></style>
