<template>
  <div>
    <h1>Account Profile</h1>
    <v-form ref="form" lazy-validation>
      Username
      <v-text-field
        v-model="profileForm.username"
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
      <div v-if="currentRouteName === 'Account'">
        <a
          v-if="!isShowResetPasswordInput"
          @click="
            (isShowResetPasswordInput = true),
              $emit('toShowNewPasswordInputs', true)
          "
          class="text-decoration-none"
        >
          Reset Password
        </a>
        <div v-else>
          New Password
          <a
            class="text-decoration-none"
            @click="
              (isShowResetPasswordInput = false),
                $emit('toShowNewPasswordInputs', false)
            "
          >
            (Not now?)</a
          >
          <v-text-field
            v-model="profileForm.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
            outlined
            required
          />
          Confirm New Password
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
        </div>
      </div>
      <div v-else>
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
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  props: [
    "isCollectForm",
    "isValidateForm",
    "profileDetails",
    "isShowNewPasswordInputs"
  ],
  mounted() {
    if (this.$route.name === "SignUp") this.profileForm = this.profileDetails;
  },
  data: () => ({
    isShowResetPasswordInput: false,
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
  }),
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    isShowNewPasswordInputs(newVal) {
      this.isShowResetPasswordInput = newVal;
      this.profileForm.password = null;
      this.profileForm.confirmPassword = null;
      this.showPassword = false;
    },
    isCollectForm(newVal) {
      if (newVal === true) this.$emit("profileDetails", this.profileForm);
    },
    isValidateForm(newVal) {
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
    },
    profileDetails(newVal) {
      this.profileForm.username = newVal.username;
      this.profileForm.email = newVal.email;
    }
  }
};
</script>
