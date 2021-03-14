<template>
  <v-card flat>
    <!-- ReAuth Password Input -->
    <v-dialog
      v-model="isShowReAuthPasswordInput"
      overlay-opacity="0.75"
      persistent
      color="primary"
      class="pa-5"
      width="80vw"
      height="50vh"
    >
      <v-card
        outlined
        rounded="xl"
        style="border:4px solid grey"
        class="px-6 pb-6 pt-3"
      >
        <v-row justify="end">
          <v-btn
            icon
            @click="
              (isShowReAuthPasswordInput = false), (reAuthPassword = null)
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center" class="mb-5">
          <span class="text-h5">
            Please enter your password to save your information
          </span>
        </v-row>
        <v-text-field
          v-model="reAuthPassword"
          label="Passowrd"
          required
          clearable
          type="password"
        />
        <v-btn
          color="success"
          width="100%"
          @click="submitReAuthPassword()"
          class="mb-5"
        >
          Done
        </v-btn>
      </v-card>
    </v-dialog>

    <v-tabs
      v-model="currentTab"
      centered
      dark
      grow
      color="blue"
      background-color="transparent"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1" class="black--text">
        Profile
      </v-tab>

      <v-tab href="#tab-2" class="black--text">
        Address
      </v-tab>

      <v-tab href="#tab-3" class="black--text">
        Payment
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab" class="pa-15">
      <v-tab-item value="tab-1">
        <AccountProfileForm
          :profileDetails="account.profile"
          :isCollectForm="isCollectForm"
          :isValidateForm="isValidateForm"
          :isShowNewPasswordInputs="isShowNewPasswordInputs"
          @toShowNewPasswordInputs="toShowNewPasswordInputs"
          @hasAnyError="hasAnyError"
          @profileDetails="collectProfileDetails"
        />
      </v-tab-item>
      <v-tab-item value="tab-2">
        <AddressForm
          :addressDetails="account.address"
          :isCollectForm="isCollectForm"
          :isValidateForm="isValidateForm"
          @hasAnyError="hasAnyError"
          @addressDetails="collectAddressDetails"
        />
      </v-tab-item>
      <v-tab-item value="tab-3">
        <CreditCardForm
          :creditCardDetails="account.creditCard"
          :isCollectForm="isCollectForm"
          :isValidateForm="isValidateForm"
          @hasAnyError="hasAnyError"
          @creditCardDetails="collectCreditCardDetails"
        />
      </v-tab-item>
    </v-tabs-items>

    <v-card-actions>
      <v-btn
        @click="saveCurrentForm()"
        class="text-capitalize"
        text
        color="blue darken-2"
        width="100%"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  async mounted() {
    this.getUserInfo();
  },
  computed: {
    getAccountInfo() {
      return this.$store.getters["user/getAccountInfo"];
    }
  },
  watch: {
    getAccountInfo() {
      this.getUserInfo();
    },
    isSaving(newVal) {
      let loading = JSON.parse(
        JSON.stringify(this.$store.getters["loading/getLoading"])
      );
      loading.isShow = newVal;
      this.$store.commit("loading/setLoading", loading);
    },
    isFormValid(newVal) {
      if (newVal) this.saveCurrentForm();
      else this.isFormValid = null;
    }
  },
  components: {
    AccountProfileForm: () => import("@/components/sign-up/AccountProfileForm"),
    AddressForm: () => import("@/components/sign-up/AddressForm"),
    CreditCardForm: () => import("@/components/sign-up/CreditCardForm")
  },
  data: () => ({
    currentTab: null,
    isValidateForm: false,
    isCollectForm: false,
    isFormValid: null,
    isSaving: false,
    account: {
      profile: {},
      address: {},
      creditCard: {}
    },
    isShowReAuthPasswordInput: false,
    reAuthPassword: null,
    isReAuthPasswordValid: false,
    isShowNewPasswordInputs: false
  }),
  methods: {
    toShowNewPasswordInputs(val) {
      this.isShowNewPasswordInputs = val;
    },
    async submitReAuthPassword() {
      await this.$store
        .dispatch("firebase/authentication/signIn", {
          loginDetails: {
            email: this.getAccountInfo.email,
            password: this.reAuthPassword
          }
        })
        .then(res => {
          if (res.status === "fail") {
            const message = "Invalid password. Please enter again.";
            const messageColour = "error";
            this.showSnackBarMessage(message, messageColour);
          } else {
            this.isShowReAuthPasswordInput = false;
            this.isReAuthPasswordValid = true;
            this.reAuthPassword = null;
            this.saveCurrentForm();
          }
        });
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
    collectProfileDetails(val) {
      this.account.profile = val;
      this.isCollectForm = false;
    },
    collectAddressDetails(val) {
      this.account.address = val;
      this.isCollectForm = false;
    },
    collectCreditCardDetails(val) {
      this.account.creditCard = val;
      this.isCollectForm = false;
    },
    hasAnyError(val) {
      this.isFormValid = val;
      this.isValidateForm = false;
    },
    async saveCurrentForm() {
      if (this.isValidateForm === false && this.isFormValid === null) {
        this.isValidateForm = true;
      }
      if (this.isFormValid === true) {
        if (!this.isReAuthPasswordValid) this.isShowReAuthPasswordInput = true;

        if (this.isReAuthPasswordValid) {
          this.isSaving = true;
          this.isCollectForm = true;
          //set time to allow form details to be collected
          setTimeout(async () => {
            switch (this.currentTab) {
              case "tab-1":
                {
                  const profile = this.account.profile;
                  const username = profile.username;
                  const email = profile.email;
                  const password = profile.password;
                  const uid = this.getAccountInfo.uid;

                  await this.$store //update user's username & email on firestore
                    .dispatch("firebase/firestore/updateUserInfo", {
                      data: { profile: { username, email } },
                      uid
                    });

                  //update user's email on firebase authentication
                  await this.$store.dispatch(
                    "firebase/authentication/updateEmail",
                    {
                      email
                    }
                  );
                  //update user's password on firebase authentication
                  if (password !== null && password)
                    await this.$store.dispatch(
                      "firebase/authentication/updatePassword",
                      {
                        password
                      }
                    );
                }
                break;
              default:
                {
                  const address = this.account.address;
                  const creditCard = this.account.creditCard;
                  const uid = await this.getAccountInfo.uid;
                  // update user's address & credit card on firestore
                  await this.$store.dispatch(
                    "firebase/firestore/updateUserInfo",
                    {
                      data: { address, creditCard },
                      uid
                    }
                  );
                }
                break;
            }

            const message = "Your details have been successfully saved";
            const messageColour = "success";
            this.showSnackBarMessage(message, messageColour);

            this.isSaving = false;
          }, 1000);
          if (this.currentTab === "tab-1") this.isShowNewPasswordInputs = false;
        }
        this.isReAuthPasswordValid = false;
        this.isFormValid = null;
      }
    },
    async getUserInfo() {
      const uid = await this.getAccountInfo.uid;
      await this.$store
        .dispatch("firebase/firestore/getUserInfo", { uid })
        .then(response => {
          if (response.status === "success") {
            const userInfo = JSON.parse(JSON.stringify(response.data));
            this.account.profile = userInfo.profile;
            this.account.address = userInfo.address;
            this.account.creditCard = userInfo.creditCard;
          }
        });
    }
  }
};
</script>
