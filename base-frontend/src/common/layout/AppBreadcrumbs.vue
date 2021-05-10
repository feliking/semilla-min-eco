<template>
  <v-breadcrumbs :items="$store.state.layout.breadcrumbs">
    <v-icon slot="divider">chevron_right</v-icon>
  </v-breadcrumbs>
</template>

<script>
export default {
  created () {
    if (this.$storage.exist('menu')) {
      let page = this.$util.getMenuOption(this.$storage.get('menu'), this.$util.trimUrl(this.$route.path));
      this.$store.commit('layout/setBreadcrumbs', page);
    }
  }
};
</script>

<style lang="scss">
.v-breadcrumbs {
  padding: 12px 15px;
}
</style>
