<template>
  <div>
    <h1>Account Profile</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      Username
      <v-text-field
        v-model="profileForm.username"
        :counter="20"
        :rules="usernameRules"
        outlined
        required
      />

      Email Address
      <v-text-field
        v-model="profileForm.email"
        :rules="emailRules"
        outlined
        required
      />

      Password
      <v-text-field
        v-model="profileForm.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        @click:append="showPassword = !showPassword"
        outlined
        required
      />

      Confirm Password
      <v-text-field
        v-model="profileForm.confirmPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="confirmPasswordRules"
        :error-messages="confirmPasswordErrMsg"
        @click:append="showPassword = !showPassword"
        outlined
        required
      />
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["isCollectForms", "isValidateForms"],
  watch: {
    isCollectForms(newVal) {
      if (newVal === true) this.$emit("profileDetails", this.profileForm);
    },
    isValidateForms(newVal) {
      if (newVal === true) {
        let hasAnyError = null;
        const arePasswordsMatch =
          this.profileForm.password === this.profileForm.confirmPassword;
        if (this.$refs.form.validate() && arePasswordsMatch) {
          this.confirmPasswordErrMsg = [];
          hasAnyError = true;
        } else {
          hasAnyError = false;
          if (!arePasswordsMatch)
            this.confirmPasswordErrMsg = ["Both passwords must match"];
        }
        this.$emit("hasAnyError", hasAnyError);
      }
    }
  },
  data: () => ({
    valid: true,
    profileForm: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    },
    usernameRules: [
      v => !!v || "Username is required",
      v =>
        (v && v.length >= 4 && v.length <= 20) ||
        "Username must be between 4 and 20 characters"
    ],
    emailRules: [
      v => !!v || "Email address is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 8 && v.length <= 20) ||
        "Password must be between 8 and 20 characters"
    ],
    confirmPasswordRules: [
      v => !!v || "Confirm Password is required",
      v =>
        (v && v.length >= 8 && v.length <= 20) ||
        "Password must be between 8 and 20 characters"
    ],
    confirmPasswordErrMsg: [],

    showPassword: false
  })
};
</script>
