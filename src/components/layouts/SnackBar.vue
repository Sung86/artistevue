<template>
  <v-snackbar
    v-model="isShow"
    :color="colour"
    :timeout="timeout"
    :top="position === 'top'"
    :right="position === 'right'"
    :bottom="position === 'bottom'"
    :left="position === 'left'"
    :multi-line="isMultiLine"
    elevation="24"
    rounded="lg"
  >
    <v-row justify="center">
      <p class="text-h5">{{ message }}</p>
    </v-row>
    <template v-if="isShowActionBtn" v-slot:action="{ attrs }">
      <v-btn
        class="text-h5"
        :color="actionBtnColour"
        text
        v-bind="attrs"
        @click="isShow = false"
      >
        {{ actionMessage }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackBar() {
      return this.$store.getters["snackBar/getSnackBar"];
    },
    isShow: {
      get: function() {
        return this.snackBar.isShow;
      },
      set: function(val) {
        let snackBar = JSON.parse(JSON.stringify(this.snackBar));
        snackBar.isShow = val;
        this.$store.commit("snackBar/setSnackBar", snackBar);
      }
    },
    isMultiLine() {
      return this.snackBar.isMultiLine;
    },
    actionBtnColour() {
      return this.snackBar.actionBtnColour;
    },
    actionMessage() {
      return this.snackBar.actionMessage;
    },
    isShowActionBtn() {
      return this.snackBar.isShowActionBtn;
    },
    message() {
      return this.snackBar.message;
    },
    colour() {
      return this.snackBar.colour;
    },
    position() {
      return this.snackBar.position;
    },
    timeout() {
      return this.snackBar.timeout;
    }
  }
};
</script>
