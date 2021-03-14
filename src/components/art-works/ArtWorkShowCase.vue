<template>
  <div>
    <v-carousel v-model="model" class="rounded-xl">
      <v-carousel-item
        v-for="(art, i) in arts"
        :key="i"
        :src="art"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      arts: [
        "https://linusgallery.com/art-gallery/wp-content/uploads/2017/03/urban-art-galleries-los-angeles-gritsenko-1.jpg",
        "https://art-sheep.com/wp-content/uploads/2016/01/street-art-seth-globepainter-julien-malland-55__880.jpg",
        "http://artmarketmag.com/wp-content/uploads/2017/04/4.jpg",
        "https://www.artpeoplegallery.com/wp-content/uploads/2015/09/duy-8.jpg",
        "https://waterfallarts.org/wp-content/uploads/2019/03/Belfast-Art-Market-image-for-poster-e1552070223789.jpg"
      ],
      model: 0
    };
  }
};
</script>

<style></style>
