'use strict';

const layout = {
  namespaced: true,
  state: {
    drawer: true,
    miniVariant: false,
    rightDrawer: false,
    breadcrumbs: {}
  },
  mutations: {
    toggleDrawer (state) {
      state.drawer = !state.drawer;
    },
    toggleMiniVariant (state) {
      state.miniVariant = !state.miniVariant;
    },
    toggleRightDrawer (state) {
      state.rightDrawer = !state.rightDrawer;
    },
    setBreadcrumbs (state, items) {
      state.breadcrumbs = items;
    }
  }
};

export default layout;
