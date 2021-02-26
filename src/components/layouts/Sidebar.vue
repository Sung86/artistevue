<template>
  <v-card height="100%" width="100%" rounded="0">
    <v-navigation-drawer
      absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      width="100%"
      permanent
    >
      <v-list nav>
        <v-list-item
          v-for="([icon, title, path], i) in items"
          :key="i"
          link
          :to="{ path }"
          @click="$emit('emitSideBar', false)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [
      ["mdi-account", "Account", "/account"],
      ["mdi-palette", "My Art Works", "/my-art-works"],
      ["mdi-brush", "Post An Art", "/post-an-art"],
      ["mdi-package-variant", "My Orders", "/my-orders"],
      ["mdi-logout-variant", "Sign Out", "sign-out"]
    ]
  })
};
</script>
