<template>
  <v-container class="pa-8">
    <v-row justify="center" v-for="n in 4" :key="n">
      <v-col cols="12">
        <ArtWorkShowCase />
        <v-row justify="end" class="mr-5">
          <ArtWorkLikes />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    ArtWorkShowCase: () => import("@/components/art-works/ArtWorkShowCase"),
    ArtWorkLikes: () => import("@/components/art-works/ArtWorkLikes")
  }
};
</script>

<style></style>
