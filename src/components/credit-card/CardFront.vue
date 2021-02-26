<template>
  <v-card width="500px" height="250px" elevation="10" rounded="lg" outlined>
    <v-img src="@/assets/images/pexels-evie-shaffer1-640x427.jpg" height="100%">
      <div
        class="d-flex flex-column align-center justify-center"
        style="height:100%;"
      >
        <v-row justify="center" align="center" style="width:100%;" class="pa-3">
          <v-col cols="12">
            <div
              class="d-flex flex-row justify-end white--text font-weight-bold headline text-shadow"
            >
              VISA
            </div>
          </v-col>
          <v-col cols="12">
            <div
              class="d-flex flex-row justify-center white--text font-weight-bold headline text-shadow"
            >
              {{ creditCardForm.amexCardMask }}
            </div>
          </v-col>
          <v-col cols="6">
            <p class="white--text font-weight-bold subtitle text-shadow">
              {{ creditCardForm.cardHolder }}
            </p>
          </v-col>
          <v-col cols="6">
            <div class="d-flex flex-column align-end">
              <p class="white--text font-weight-bold subtitle text-shadow">
                {{ creditCardForm.expireMonth }} /
                {{ creditCardForm.expireYear }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: ["creditCardForm"]
};
</script>
