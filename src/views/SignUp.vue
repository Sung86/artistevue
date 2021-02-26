<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="center">
          Create your account
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
  components: {
    SignUpForm: () => import("@/components/sign-up/SignUpForm")
  }
};
</script>

<style></style>
