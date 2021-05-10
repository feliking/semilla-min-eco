<template>
  <v-navigation-drawer
    persistent
    :mini-variant="$store.state.layout.miniVariant"
    :clipped="clipped"
    v-model="$store.state.layout.drawer"
    enable-resize-watcher
    fixed
    class="app-sidenav"
    app
    width="260"
    mini-variant-width="68"
  >
    <div class="app-logo">
      <h1 class="app-title"><v-icon color="white">scatter_plot</v-icon><span>{{ $t('app.title') }}</span></h1>
    </div>
    <v-list id="sidenav-menu">
      <v-list-group
        v-model="item.active"
        v-for="item in menu"
        :key="item.label"
        :prepend-icon="item.icon"
        v-if="item.submenu"
        class="sidenav-parent"
        no-action
      >
        <v-list-tile
          slot="activator"
          @click="send(item.url, item.submenu)"
          :data-url="item.url"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ getLabel(item) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="subItem in item.submenu"
          :key="subItem.label"
          @click="send(subItem.url)"
          :data-url="subItem.url"
          class="sidenav-children"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ getLabel(subItem) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile
        v-else
        @click="send(item.url, item.submenu)"
        :data-url="item.url"
        class="sidenav-one"
      >
        <v-list-tile-action>
          <v-icon color="success">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ getLabel(item) }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import layout from './mixins/layout';

export default {
  mixins: [ layout ],
  mounted () {
    if (this.$storage.exist('menu')) {
      this.$store.commit('setMenu', this.$storage.get('menu'));
    }

    if (this.$storage.existUser()) {
      this.$store.commit('setUser', this.$storage.getUser());
    }

    this.setActive(this.$route.path);
    setTimeout(() => (this.clickEvent(this.$route.path)), 600);
  },
  data: () => ({
    clipped: false
  }),
  computed: {
    ...mapState(['menu', 'user'])
  },
  methods: {
    send (url, submenu) {
      if (submenu === undefined) {
        if (this.$storage.exist('menu')) {
          let page = this.$util.getMenuOption(this.$storage.get('menu'), url);
          this.$store.commit('layout/setBreadcrumbs', page);
        }

        this.setActive(url);

        this.$router.push('/' + (url || ''));
      }
    },
    getLabel (item) {
      // if (item.url) {
      //   let label = this.$t(`menu.${item.url.replace('/', '')}`);
      //   if (label.indexOf('.') === -1) {
      //     return label;
      //   }
      // }

      return item.label;
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

$bgSidenav: darken($primary, 5%);

.theme--light .app-sidenav {
  background-color: $bgSidenav !important;

  .v-list {
    background-color: $bgSidenav;
    padding: 0;
  }

  .v-list .v-list__tile--link.active {
    background-color: rgba(0,0,0,0.12);
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 60px;
  }

  .v-list__group__header__prepend-icon {
    padding: 0 4px 0 16px;

    & + div > .v-list__tile {
      padding-left: 4px;
    }
  }

  .v-list__tile.primary--text, .v-list__group,
  .sidenav-one .v-list__tile__content {
    color: lighten($primary, 40%);

    .v-icon {
      color: lighten($success, 6%);
    }

    .v-list__tile__title {
      font-size: 16px;
    }
  }

  .sidenav-one {
    .v-list__tile__action {
      min-width: 44px;
    }
    .v-list__tile__content {

    }
  }

  .app-logo {
    background-color: darken($bgSidenav, 2%);
    height: 70px;

    .v-icon {
      font-size: 36px;
      margin: -5px 5px 0 0;
    }

    .app-title {
      color: white;
      font-weight: 300;
      line-height: 66px;
      font-size: 24px;
      padding: 0 15px;
      white-space: nowrap;
    }
  }

  &.v-navigation-drawer--mini-variant {
    overflow: initial;

    .app-title {
      span {
        display: none;
      }
    }

    .sidenav-one:hover {
      width: 280px;
      background-color: $primary;

      .v-list__tile__action {
        margin-right: 30px;
      }
    }

    .v-list__tile__content {
      opacity: 1;
    }

    .v-list__group__items--no-action .v-list__tile {
      padding-left: 20px;
      padding-right: 20px;
    }

    .sidenav-parent {
      background-color: $primary;
      position: relative;

      &:hover {
        .v-list__group__header {
          background-color: $primary;
          width: 280px;

          .v-list__tile--link {
            display: block;
          }
        }

        .v-list__group__items {
          border-top: 2px solid darken($primary, 10%);
          background-color: $primary;
          display: block !important;
          position: absolute;
          z-index: 5;
          top: 60px;
          left: 70px;
          border-radius: 0 0 3px 3px;
          width: 210px;
        }
      }
    }

    .v-list {
      .sidenav-one .v-list__tile--link {
        padding: 10px 20px 10px 9px;
        height: 60px;

        .v-list__tile__action {
        }
      }
    }

    .v-list__group__header {
      .v-list__group__header__prepend-icon {
        padding: 16px 4px 16px 20px;
        width: 68px;

        .v-icon {
          font-size: 2rem;
        }
      }

      .v-list__tile--link {
        display: none;
      }

      .v-list__group__header__append-icon {
        display: none;
      }
    }

    .v-list__group__items {
      display: none !important;
    }
  }

}
</style>
