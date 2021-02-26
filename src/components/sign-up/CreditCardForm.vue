<template>
  <div>
    <h1>Credit Card Detail</h1>
    <!-- Credit Card Animation-->
    <v-row justify="center">
      <Flipper :flipped="flipped" width="500px" height="250px">
        <CardFront :creditCardForm="creditCardForm" slot="front" />
        <CardBack :creditCardForm="creditCardForm" slot="back" />
      </Flipper>
    </v-row>
    <br />
    <!-- Credit Card Form  -->
    <v-form :disabled="flipping">
      Card Number
      <v-text-field v-model="creditCardForm.cardNumber" outlined required />
      Card Holder
      <v-text-field v-model="creditCardForm.cardHolder" outlined required />

      <v-row>
        <v-col cols="6" md="4">
          Expiration Date
          <v-select
            v-model="creditCardForm.expireMonth"
            :items="items"
            label="MM"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="6" md="4">
          <br />
          <v-select
            v-model="creditCardForm.expireYear"
            :items="items"
            label="YY"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          CVV
          <br />
          <v-text-field
            @mouseenter="flipCardToBack()"
            @mouseleave="flipCardToFront()"
            v-model="creditCardForm.cvv"
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
  components: {
    CardFront: () => import("@/components/credit-card/CardFront"),
    CardBack: () => import("@/components/credit-card/CardBack"),
    Flipper: () => import("vue-flipper")
  },
  data: () => ({
    flipped: false,
    flipping: false,
    creditCardForm: {
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardHolder: "FULL NAME",
      expireMonth: "MM",
      expireYear: "YY",
      cvv: "####"
    },
    items: ["1", "2"]
  }),
  methods: {
    flipCardToFront() {
      this.flipped = false;
    },
    flipCardToBack() {
      this.flipped = true;
    }
  }
};
</script>
<style src="vue-flipper/dist/vue-flipper.css"></style>
