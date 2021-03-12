<template>
  <v-card class="pa-10">
    <!-- Forms -->
    <v-overlay :value="isGoingToNextStep">
      <v-row justify="center">
        <v-progress-linear
          style="width:80vw; border:1px solid black"
          height="15"
          indeterminate
          color="cyan"
        ></v-progress-linear>
      </v-row>
    </v-overlay>
    <AccountProfileForm
      v-if="currentStep == 0"
      @profileDetails="collectProfileDetails"
      @hasAnyError="hasAnyError"
      :isCollectForms="isCollectForms"
      :isValidateForms="isValidateForms"
    />
    <AddressForm
      v-else-if="currentStep == 1"
      @addressDetails="collectAddressDetails"
      @hasAnyError="hasAnyError"
      :isCollectForms="isCollectForms"
      :isValidateForms="isValidateForms"
    />
    <CreditCardForm
      v-else-if="currentStep == 2"
      @creditCardDetails="collectCreditCardDetails"
      @hasAnyError="hasAnyError"
      :isCollectForms="isCollectForms"
      :isValidateForms="isValidateForms"
    />

    <!-- Current Sign Up Progression's Buttons  -->
    <v-row justify="center">
      <v-col cols="12">
        <v-btn
          class="text-capitalize ml-3"
          text
          color="blue darken-1"
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
          color="blue darken-1"
          width="100%"
          @click="backStep()"
        >
          Back
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          class="text-capitalize"
          text
          color="blue darken-1"
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
    isCollectForms: false,
    isValidateForms: false,
    isFormValid: null,
    isNotNowButtonClicked: false,
    profileDetails: {},
    addressDetails: {},
    creditCardDetails: {}
  }),
  watch: {
    isFormValid(newVal) {
      if (newVal) this.nextStep();
      else this.isFormValid = null;
    }
  },
  methods: {
    hasAnyError(val) {
      this.isFormValid = val; //false = got error = invalid form
      this.isValidateForms = false;
    },
    collectProfileDetails(val) {
      this.profileDetails = val;
      this.isCollectForms = false;
    },
    collectAddressDetails(val) {
      this.addressDetails = val;
      this.isCollectForms = false;
    },
    collectCreditCardDetails(val) {
      this.creditCardDetails = val;
      this.isCollectForms = false;
    },
    signUp(userData) {
      this.$store
        .dispatch("firebase/authentication/signUp", {
          profile: userData.profile
        })
        .then(async response => {
          if (response.status !== "fail") {
            const user = response.user;
            await this.$store
              .dispatch("firebase/firestore/createUser", { userData, user })
              .then(response => {
                if (response.status !== "fail") {
                  this.$router.push({ name: "Landing" }).then(() => {
                    alert("You have successfully signed up!");
                  });
                } else {
                  alert("Fail to create");
                }
              });
          } else {
            console.log("I'm here");
            alert(
              "Fail to sign up. Please try again later." +
                " You may have already signed up before."
            );
          }
        });
    },
    validateForms() {
      this.isValidateForms = true;
    },
    nextStep() {
      if (!this.isNotNowButtonClicked) {
        if (this.isValidateForms === false && this.isFormValid === null) {
          this.validateForms();
        }
      } else {
        this.isNotNowButtonClicked = false;
        this.isFormValid = true; //false = got error = invalid form
        this.isValidateForms = false;
      }
      if (this.isFormValid === true) {
        this.isCollectForms = true;
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
