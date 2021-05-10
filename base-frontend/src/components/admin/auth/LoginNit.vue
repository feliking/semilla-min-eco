<template>
  <section>
    <div class="login-container login-nit">
      <!-- <div class="logo-app"></div> -->
      <div class="title-app">
        <h2>Sistema</h2>
        <h3>Base</h3>
      </div>
      <v-card class="login-form">
        <v-layout v-bind="binding">
          <v-flex xs12 sm6 class="line">
            <v-form
              @submit.prevent="submitSin"
              v-model="validSin"
              ref="formSin"
              lazy-validation
            >
              <v-card-title primary-title>
                <h4>{{ $t('login.title_nit') }}</h4>
                <v-alert color="info" value="true" outline>Para ingresar debe emplear los datos del <strong>NIT, usuario y contraseña</strong> con los que accede a la <strong>Oficina Virtual del Servicio de Impuestos Nacionales</strong>.</v-alert>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        :label="$t('login.nit')"
                        append-icon="account_balance"
                        v-model="formSin.nit"
                        autofocus
                        maxlength="25"
                        :rules="$validate(['required'])"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        :label="$t('login.user')"
                        append-icon="person"
                        v-model="formSin.username"
                        autofocus
                        maxlength="25"
                        :rules="$validate(['required'])"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        :label="$t('login.password')"
                        append-icon="lock"
                        :append-icon="getIconSin"
                        @click:append="changeIconSin"
                        :type="hidePassSin ? 'password' : 'text'"
                        v-model="formSin.password"
                        maxlength="100"
                        :rules="$validate(['required'])"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  large
                  :disabled="!validSin"
                  type="submit"
                >{{ $t('login.login') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12 sm6>
            <v-form
              @submit.prevent="submit"
              v-model="valid"
              ref="form"
              lazy-validation
            >
              <v-card-title primary-title>
                <h4>{{ $t('login.title') }}</h4>
                <v-alert color="info" value="true" outline>Para ingresar debe emplear los datos proporcionados por el <strong>Administrador del sistema</strong> o el <strong>Administrador de su Entidad</strong>.</v-alert>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        :label="$t('login.user')"
                        append-icon="person"
                        v-model="form.username"
                        autofocus
                        maxlength="25"
                        :rules="$validate(['required'])"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        :label="$t('login.password')"
                        append-icon="lock"
                        :append-icon="getIcon"
                        @click:append="changeIcon"
                        :type="hidePass ? 'password' : 'text'"
                        v-model="form.password"
                        maxlength="100"
                        :rules="$validate(['required'])"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  large
                  :disabled="!valid"
                  type="submit"
                >{{ $t('login.login') }}</v-btn>
              </v-card-actions>
              <v-card-title class="login-options">
                <div class="text-xs-right">
                  <a href=""><v-icon>lock_outline</v-icon> {{ $t('login.forgotPass') }}</a>
                </div>
              </v-card-title>
              <!-- <v-card-title class="info">
                <a href="">{{ $t('login.signUp') }}</a>
              </v-card-title> -->
            </v-form>
          </v-flex>
        </v-layout>
      </v-card>
      <div class="text-xs-center mt-3">
        <router-link to="/login">Login</router-link> |
        <router-link to="/login-ciudadania">Login Ciudadania</router-link>
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
import validate from '@/common/mixins/validate';

export default {
  mixins: [ Auth, validate ],
  data () {
    return {
      valid: true,
      validSin: true,
      form: {
        username: '',
        password: ''
      },
      formSin: {
        nit: '',
        username: '',
        password: ''
      },
      hidePass: true,
      hidePassSin: true,
      remember: false
    };
  },
  methods: {
    changeIcon () {
      if (this.form.password.length) {
        this.hidePass = !this.hidePass;
      }
    },
    changeIconSin () {
      if (this.formSin.password.length) {
        this.hidePassSin = !this.hidePassSin;
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.login(this.form);
      }
    },
    submitSin () {
      if (this.$refs.formSin.validate()) {
        this.login(this.formSin);
      }
    },
    authenticate () {
      this.getCode();
    }
  },
  components: { AppLang },
  computed: {
    getIcon () {
      return this.form.password.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
    },
    getIconSin () {
      return this.formSin.password.length === 0 ? 'lock' : this.hidePassSin ? 'visibility' : 'visibility_off';
    },
    binding () {
      const binding = {};
      if (this.$vuetify.breakpoint.smAndDown) {
        binding.column = true;
      }
      return binding;
    }
  },
  watch: {
    'form.password': function (val) {
      if (val.length === 0) {
        this.hidePass = true;
      }
    },
    'formSin.password': function (val) {
      if (val.length === 0) {
        this.hidePassSin = true;
      }
    }
  }
};
</script>

<style src="./login.scss" lang="scss"></style>
