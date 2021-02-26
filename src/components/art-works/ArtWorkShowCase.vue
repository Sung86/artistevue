<template>
  <div>
    <v-carousel v-model="model" class="rounded-xl">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      model: 0
    };
  }
};
</script>

<style></style>
