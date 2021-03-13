<template>
  <v-card height="100%" width="100%" rounded="0" style="position:absolute">
    <v-navigation-drawer
      fixed
      dark
      temporary
      color="white"
      style="border:1px solid black"
      overlay-opacity="0.8"
      right
      expand-on-hover
      v-model="bindSideBar"
      class="pt-10"
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
            <v-icon color="blue">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span class="black--text">{{ title }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list nav>
          <v-list-item @click="$emit('emitSideBar', false)">
            <v-list-item-icon>
              <v-icon color="grey">mdi-close-thick</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <v-btn width="100%" class="text-capitalize" color="grey">
                  Close
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  props: ["showSideBar"],
  data: () => ({
    items: [
      ["mdi-account", "Account", "/account"],
      ["mdi-palette", "My Art Works", "/my-art-works"],
      ["mdi-brush", "Post An Art", "/post-an-art"],
      ["mdi-package-variant", "My Orders", "/my-orders"],
      ["mdi-logout-variant", "Sign Out", "sign-out"]
    ]
  }),
  computed: {
    bindSideBar: {
      get: function() {
        return this.showSideBar;
      },
      set: function(value) {
        this.$emit("emitSideBar", value);
      }
    }
  }
};
</script>
