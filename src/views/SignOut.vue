<template>
  <div>Sign Out</div>
</template>

<script>
export default {
  mounted() {
    this.signOut();
  },
  methods: {
    signOut() {
      this.$store.dispatch("firebase/authentication/signOut").then(() => {
        this.$store.commit("user/resetState");
        this.$router.push({ name: "Landing" });
      });
    }
  }
};
</script>

<style></style>
