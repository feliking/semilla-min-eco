<template>
  <section>
    <div class="login-container login-ciudadania">
      <!-- <div class="logo-app"></div> -->
      <div class="title-app">
        <h2>Sistema</h2>
        <h3>Base</h3>
      </div>
      <v-card class="login-form">
        <v-layout>
          <v-flex xs12>
            <v-card-title primary-title>
              <h4>Inicio de sesión con:</h4>
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="success"
                block
                large
                type="button"
                @click="authenticate"
              >CIUDADANÍA DIGITAL</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
      <div class="text-xs-center mt-3">
        <router-link to="/login">Login</router-link> |
        <router-link to="/login-nit">Login NIT</router-link>
      </div>
    </div>
    <div class="login-lang">
      <app-lang></app-lang>
    </div>
  </section>
</template>

<script>
import Auth from './mixins/auth';
import AppLang from '@/common/layout/AppLang';

export default {
  mixins: [ Auth ],
  methods: {
    authenticate () {
      this.getCode();
    }
  },
  components: { AppLang }
};
</script>

<style lang="scss">
@import './login.scss';
</style>
