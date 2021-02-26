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
        :rules="passwordRules"
        @click:append="showPassword = !showPassword"
        outlined
        required
      />
    </v-form>
  </div>
</template>

<script>
export default {
  props: [],
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
      v => (v && v.length <= 20) || "Username must be less than 20 characters"
    ],
    emailRules: [
      v => !!v || "Email address is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid"
    ],

    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Min 8 characters"
    ],

    showPassword: false
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
