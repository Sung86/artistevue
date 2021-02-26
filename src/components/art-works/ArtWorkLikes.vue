<template>
  <div>
    <v-btn class="ma-2" :color="colourOfLike" text @click="likeAnArtWork()">
      {{ totalLikes }}
      <v-icon>mdi-heart </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    hasLiked: false,
    totalLikes: 10,
    colourOfLike: "grey"
  }),
  methods: {
    likeAnArtWork() {
      if (this.hasLiked) {
        this.totalLikes--;
        this.colourOfLike = "grey";
      } else {
        this.totalLikes++;
        this.colourOfLike = "red";
      }
      this.hasLiked = !this.hasLiked;
    }
  }
};
</script>

<style></style>
