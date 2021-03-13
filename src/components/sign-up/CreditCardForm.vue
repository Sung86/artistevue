<template>
  <div>
    <h1>Credit Card</h1>
    <!-- Credit Card Animation-->
    <v-row justify="center">
      <Flipper :flipped="flipped" width="500px" height="250px">
        <CardFront :creditCardForm="creditCardForm" slot="front" />
        <CardBack :creditCardForm="creditCardForm" slot="back" />
      </Flipper>
    </v-row>
    <br />
    <!-- Credit Card Form  -->
    <v-form ref="form" :disabled="flipping" lazy-validation>
      Card Number
      <v-text-field
        v-model="creditCardForm.cardNumber"
        :rules="cardNumberRules"
        outlined
        required
      />
      Card Holder
      <v-text-field
        v-model="creditCardForm.cardHolder"
        :rules="cardHolderRules"
        outlined
        required
      />

      <v-row>
        <v-col cols="6" md="4">
          Expiration Date <br />
          MM
          <v-select
            v-model="creditCardForm.expireMonth"
            :items="months"
            :rules="expirationMonthRules"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="6" md="4">
          <br />
          YY
          <v-select
            v-model="creditCardForm.expireYear"
            :items="years"
            :rules="expirationYearRules"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <br class="hidden-sm-and-down" />
          CVV
          <br />
          <v-text-field
            v-click-outside="flipCardToFront"
            @click="flipCardToBack"
            v-model="creditCardForm.cvv"
            :rules="cvvRules"
            outlined
            required
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ["isCollectForms", "isValidateForms"],
  components: {
    CardFront: () => import("@/components/credit-card/CardFront"),
    CardBack: () => import("@/components/credit-card/CardBack"),
    Flipper: () => import("vue-flipper")
  },
  watch: {
    isCollectForms(newVal) {
      if (newVal === true) this.$emit("creditCardDetails", this.creditCardForm);
    },
    isValidateForms(newVal) {
      if (newVal === true) {
        const hasAnyError = this.$refs.form.validate();
        this.$emit("hasAnyError", hasAnyError);
      }
    }
  },
  data: () => ({
    flipped: false,
    flipping: false,
    cardNumberRules: [
      v => !!v || "Card number is required",
      v =>
        /^[0-9]{15,20}$/.test(v) ||
        "Card number must be between 15 and 20 digits - no spaces"
    ],
    cardHolderRules: [
      v => !!v || "Card holder is required",
      v =>
        /^[a-zA-Z ]{1,40}$/.test(v) ||
        "Card holder must be between 1 and 40 characters"
    ],
    expirationMonthRules: [v => !!v || "Month is required"],
    expirationYearRules: [v => !!v || "Year is required"],
    cvvRules: [
      v => !!v || "CVV is required",
      v => /^[0-9]{3,4}$/.test(v) || "CVV must be 3 or 4 digits"
    ],

    creditCardForm: {
      cardNumber: "",
      cardHolder: "",
      expireMonth: "",
      expireYear: "",
      cvv: ""
    }
  }),
  computed: {
    months: function() {
      let arrMonths = [];
      for (let i = 1; i <= 12; i++) arrMonths[i - 1] = i < 10 ? "0" + i : i;
      return arrMonths;
    },
    years: function() {
      const currentYear = new Date().getFullYear();
      const arrYears = [];
      for (let i = 0; i < 10; i++) arrYears[i] = currentYear + i;
      return arrYears;
    }
  },
  methods: {
    flipCardToFront() {
      this.flipped = false;
    },
    flipCardToBack() {
      this.flipped = true;
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
<style src="vue-flipper/dist/vue-flipper.css"></style>
