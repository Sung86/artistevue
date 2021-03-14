<template>
  <v-card class="pa-10">
    <!-- Forms -->
    <AccountProfileForm
      v-if="currentStep == 0"
      @profileDetails="collectProfileDetails"
      @hasAnyError="hasAnyError"
      :isCollectForm="isCollectForm"
      :isValidateForm="isValidateForm"
      :profileDetails="profileDetails"
    />
    <AddressForm
      v-else-if="currentStep == 1"
      @addressDetails="collectAddressDetails"
      @hasAnyError="hasAnyError"
      :isCollectForm="isCollectForm"
      :isValidateForm="isValidateForm"
      :addressDetails="addressDetails"
    />
    <CreditCardForm
      v-else-if="currentStep == 2"
      @creditCardDetails="collectCreditCardDetails"
      @hasAnyError="hasAnyError"
      :isCollectForm="isCollectForm"
      :isValidateForm="isValidateForm"
      :creditCardDetails="creditCardDetails"
    />

    <!-- Current Sign Up Progression's Buttons  -->
    <v-row justify="center">
      <v-col cols="12">
        <v-btn
          class="text-capitalize ml-3"
          text
          color="blue darken-2"
          width="100%"
          @click="(isNotNowButtonClicked = true), nextStep()"
          v-if="currentStep == 2"
        >
          Not Now ?
        </v-btn>
      </v-col>

      <v-col cols="6">
        <v-btn
          class="text-capitalize"
          text
          color="blue darken-2"
          width="100%"
          @click="backStep()"
          v-if="currentStep >= 1"
        >
          Back
        </v-btn>
      </v-col>
      <v-col :cols="currentStep == 0 ? 12 : 6">
        <v-btn
          class="text-capitalize"
          text
          color="blue darken-2"
          width="100%"
          @click="nextStep()"
          v-if="currentStep <= 2"
        >
          Next
        </v-btn>
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
    currentStep: 0,
    isGoingToNextStep: false,
    isCollectForm: false,
    isValidateForm: false,
    isFormValid: null,
    isNotNowButtonClicked: false,
    profileDetails: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    },
    addressDetails: {
      addressLine: null,
      city: null,
      state: null,
      zip: null,
      country: null
    },
    creditCardDetails: {
      cardNumber: "",
      cardHolder: "",
      expireMonth: "",
      expireYear: "",
      cvv: ""
    }
  }),
  watch: {
    isFormValid(newVal) {
      if (newVal) this.nextStep();
      else this.isFormValid = null;
    },
    isNotNowButtonClicked(newVal) {
      this.showLoading(newVal);
    },
    isGoingToNextStep(newVal) {
      this.showLoading(newVal);
    }
  },
  methods: {
    showLoading(isShow) {
      let loading = JSON.parse(
        JSON.stringify(this.$store.getters["loading/getLoading"])
      );
      loading.isShow = isShow;
      this.$store.commit("loading/setLoading", loading);
    },
    showSnackBarMessage(message, messageColour) {
      let snackBar = JSON.parse(
        JSON.stringify(this.$store.getters["snackBar/getSnackBar"])
      );
      snackBar.message = message;
      snackBar.colour = messageColour;
      snackBar.isShow = true;
      this.$store.commit("snackBar/setSnackBar", snackBar);
    },
    hasAnyError(val) {
      this.isFormValid = val;
      this.isValidateForm = false;
    },
    collectProfileDetails(val) {
      this.profileDetails = val;
      this.isCollectForm = false;
    },
    collectAddressDetails(val) {
      this.addressDetails = val;
      this.isCollectForm = false;
    },
    collectCreditCardDetails(val) {
      this.creditCardDetails = val;
      this.isCollectForm = false;
    },
    async signUp(userData) {
      await this.$store
        .dispatch("firebase/authentication/signUp", {
          profile: userData.profile
        })
        .then(async response => {
          if (response.status !== "fail") {
            const user = response.user;
            await this.$store
              .dispatch("firebase/firestore/createUser", { userData, user })
              .then(async response => {
                if (response.status !== "fail") {
                  this.$router.push({ name: "Landing" }).then(() => {
                    const message = "You've successfully signed up!";
                    const messageColour = "success";
                    this.showSnackBarMessage(message, messageColour);
                  });
                } else {
                  const message =
                    "Sign up process occurs errors. Please try again later.";
                  const messageColour = "error";
                  this.showSnackBarMessage(message, messageColour);
                }
              });
          } else {
            const message =
              "Fail to sign up. Please try again later." +
              " You may have already signed up before.";
            const messageColour = "error";
            this.showSnackBarMessage(message, messageColour);
          }
        });
    },
    validateForms() {
      this.isValidateForm = true;
    },
    nextStep() {
      if (!this.isNotNowButtonClicked) {
        if (this.isValidateForm === false && this.isFormValid === null) {
          this.validateForms();
        }
      } else {
        this.isFormValid = true;
        this.isValidateForm = false;
      }
      if (this.isFormValid === true) {
        this.isCollectForm = true;
        this.isGoingToNextStep = true;
        //set time to allow form details to be collected
        setTimeout(() => {
          if (this.currentStep == 2) {
            const profile = this.profileDetails;
            const address = this.addressDetails;
            const creditCard = this.creditCardDetails;
            const userData = {
              profile,
              address,
              creditCard
            };

            this.signUp(userData);
          } else {
            this.currentStep++;
          }
          this.isNotNowButtonClicked = false;
          this.isGoingToNextStep = false;
        }, 1000);
      }
      this.isFormValid = null;
    },
    backStep() {
      this.currentStep--;
    }
  }
};
</script>
