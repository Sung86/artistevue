<template>
  <v-dialog v-model="isShow">
    <v-overlay>
      <v-row justify="center">
        <v-progress-linear
          style="width:80vw; border:1px solid black"
          height="15"
          indeterminate
          color="cyan"
        ></v-progress-linear>
      </v-row>
    </v-overlay>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters["loading/getLoading"];
    },
    isShow: {
      get: function() {
        return this.loading.isShow;
      },
      set: function(val) {
        let loading = JSON.parse(JSON.stringify(this.loading));
        loading.isShow = val;
        this.$store.commit("loading/setLoading", loading);
      }
    }
  }
};
</script>
