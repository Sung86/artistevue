<template>
  <v-card width="500px" height="250px" elevation="10" rounded="lg" outlined>
    <v-img src="@/assets/images/pexels-evie-shaffer2-640x407.jpg" height="100%">
      <div
        class="d-flex flex-column align-center justify-center "
        style="height:100%;"
      >
        <v-row justify="center" align="center" style="width:100%;" class="pa-3">
          <v-col cols="12">
            <div
              class="d-flex flex-row justify-end black--text font-weight-bold
                    headline text-shadow px-3 rounded-lg mx-3 py-2"
              style="border:1px solid black; background-color:white"
            >
              {{ creditCardForm.cvv }}
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

<style></style>
