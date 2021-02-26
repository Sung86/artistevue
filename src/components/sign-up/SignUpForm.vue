<template>
  <v-card class="pa-10">
    <!-- Forms -->
    <AccountProfileForm v-if="step == 0" />
    <AddressForm v-else-if="step == 1" />
    <CreditCardForm v-else-if="step == 2" />

    <!-- Current Progression's Buttons  -->
    <v-row justify="center">
      <v-col cols="6">
        <v-btn
          class="text-capitalize"
          text
          color="blue darken-1"
          width="100%"
          @click="backStep()"
          v-if="step >= 1"
        >
          Back
        </v-btn>
      </v-col>
      <v-col :cols="step == 0 ? 12 : 6">
        <div class="d-flex flex-row justify-center">
          <v-btn
            class="text-capitalize"
            text
            color="blue darken-1"
            :width="step < 2 ? '100%' : '50%'"
            @click="nextStep()"
            v-if="step <= 2"
          >
            Next
          </v-btn>
          <v-btn
            class="text-capitalize ml-3"
            text
            color="blue darken-1"
            width="50%"
            @click="nextStep()"
            v-if="step == 2"
          >
            Not Now ?
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    AccountProfileForm: () => import("@/components/sign-up/AccountProfileForm"),
    CreditCardForm: () => import("@/components/sign-up/CreditCardForm"),
    AddressForm: () => import("@/components/sign-up/AddressForm")
  },
  data: () => ({
    step: 0
  }),
  methods: {
    nextStep() {
      if (this.step == 2) {
        this.$router.push({ name: "Landing" }).then(() => {
          alert("You have successfully signed up!");
        });
      } else {
        this.step++;
      }
    },
    backStep() {
      this.step--;
    }
  }
};
</script>
