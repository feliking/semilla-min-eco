<template>
  <section>
    <h3 class="primary--text"><v-icon info>person_outline</v-icon> {{$t('user.title') }}</h3>
    <v-card>
      <v-card-text>
        <crud-table
          :headers="headers"
          :url="url"
          :filters="filters"
          :graphql="graphql"
          :data-graphql="dataGraphql"
          :widthModal="840"
        >
          <template slot="buttons">
            <v-tooltip bottom v-if="$store.state.permissions['usuarios:create']">
              <v-btn
                color="primary"
                @click.stop="openModal()"
                slot="activator"
              ><v-icon>person_add</v-icon> {{$t('common.add') }}</v-btn>
              <span>{{$t('user.add')}}</span>
            </v-tooltip>
          </template>

          <template slot="form">
            <v-card-title class="headline">
              <v-icon>{{ form.id ? 'person' : 'person_add' }}</v-icon> {{ id ? $t('user.crud.editUser') : $t('user.crud.addUser') }}
              <v-spacer></v-spacer>
              <v-btn icon @click="$store.commit('closeModal')">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-form
              @submit.prevent="save"
              v-model="valid"
              ref="form"
              lazy-validation>
              <v-alert color="info"
                value="true"
                v-if="form.usuario == username && form.id">
                Puede cambiar su contraseña dirigiéndose a:
                <router-link to="/account" class="white--text">
                  <strong><v-icon dark class="icon-small">person</v-icon> {{ $t('app.account') }}</strong>
                </router-link>.
              </v-alert>
              <v-card-text class="pt-0">
                <v-container grid-list-md class="pt-0">
                  <h4>Datos de usuario</h4>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field
                        label="Nombre de usuario"
                        prepend-icon="person"
                        v-model="usuario"
                        maxlength="50"
                        autocomplete="off"
                        :rules="$validate(['required'])"
                        required
                        autofocus
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                      <v-text-field
                        v-if="!id"
                        label="Contraseña"
                        v-model="contrasena"
                        :prepend-icon="getIcon"
                        @click:prepend="changeIcon"
                        :type="hidePass ? 'password' : 'text'"
                        maxlength="50"
                        autocomplete="off"
                        :rules="$validate(['required'])"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                      <v-text-field
                        label="Correo electrónico"
                        v-model="email"
                        maxlength="100"
                        prepend-icon="email"
                        :rules="$validate(['email'])"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                      <v-text-field
                        label="Cargo"
                        v-model="cargo"
                        maxlength="100"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs7>
                      <v-autocomplete
                        :items="entidades"
                        v-model="id_entidad"
                        label="Entidad"
                        item-text="text"
                        item-value="value"
                        noDataText="No hay resultados"
                        :rules="$validate(['required'])"
                        required
                        ></v-autocomplete>
                    </v-flex>

                    <v-flex xs5 v-if="!(usuario == username && id)">
                      <v-autocomplete
                        :items="roles"
                        v-model="id_rol"
                        label="Rol"
                        item-text="text"
                        item-value="value"
                        :rules="$validate(['required'])"
                        required
                        ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                  <h4>Datos personales</h4>
                  <persona-form store="usuario/" v-if="personaDatos" :db="true"></persona-form>

                </v-container>
                <log-datos :data="logDatos" v-if="logDatos"></log-datos>
              </v-card-text>
              <v-card-actions>
                <small class="error--text text-required">* Los campos son obligatorios</small>
                <v-spacer></v-spacer>
                <v-btn @click="$store.commit('closeModal');"><v-icon>cancel</v-icon> {{$t('common.cancel') }}</v-btn>
                <v-btn color="primary" type="submit"><v-icon>check</v-icon> {{$t('common.save') }}</v-btn>
              </v-card-actions>
            </v-form>
          </template>

          <template slot="items" slot-scope="items">
            <td class="nowrap">
              <v-tooltip bottom v-if="$store.state.permissions['usuarios:update']">
                <v-btn
                  icon
                  slot="activator"
                  @click="editItem(items.item.id, 'usuario', dataGraphqlAll)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$store.state.permissions['usuarios:update']">
                <v-btn
                  icon
                  slot="activator"
                  @click="generarToken('USUARIO', { usuario: items.item.usuario })">
                  <v-icon>vpn_key</v-icon>
                </v-btn>
                <span>Generar token para el usuario</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$store.state.permissions['usuarios:update']">
                <v-btn
                  icon
                  slot="activator"
                  @click="regenerarPassword(items.item.id)">
                  <v-icon>lock_open </v-icon>
                </v-btn>
                <span>Regenerar contraseña</span>
              </v-tooltip>
              <v-tooltip
                bottom
                v-if="$store.state.permissions['usuarios:delete'] && username !== items.item.usuario">
                <v-btn
                  icon
                  slot="activator"
                  @click="deleteItem(items.item.id, 'usuario')">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
                <span>Eliminar registro</span>
              </v-tooltip>
            </td>
            <td>
              <v-tooltip bottom v-if="$store.state.permissions['usuarios:update']">
                <v-switch
                  v-model="items.item.active"
                  value="ACTIVE"
                  v-if="username !== items.item.usuario"
                  @change="changeActive(items.item, items.item.id, 'usuario', 'EditUsuario', null, 'Update')"
                  hide-details
                  slot="activator"
                  color="success"></v-switch>
                <span>Activar/desactivar registro</span>
              </v-tooltip>
              <v-icon
                v-if="!$store.state.permissions['usuarios:update'] && username !== items.item.usuario"
                :color="items.item.active === 'ACTIVE' ? 'success' : 'error'">
                {{ items.item.active === 'ACTIVE' ? 'check' : 'close' }}
              </v-icon>
              <v-tooltip bottom>
                <router-link
                  to="/account"
                  v-if="username === items.item.usuario"
                  slot="activator">
                  <v-icon>person</v-icon>
                </router-link>
                <span>Este usuario soy yo, clic aquí para ir a mi cuenta.</span>
              </v-tooltip>
            </td>
            <td>{{ items.item.usuario }}</td>
            <td>{{ items.item.persona.primer_apellido }} {{ items.item.persona.segundo_apellido }} {{ items.item.persona.nombres }}</td>
            <td>{{ items.item.email }}</td>
            <td>{{ items.item.entidad.nombre }}</td>
            <td>{{ (items.item.rol.nombre).replace(/_/gi, ' ') }}</td>
            <td>
              <v-chip label color="success" text-color="white" v-if="items.item.estado == 'ACTIVO'">
                {{ items.item.estado }}
              </v-chip>
              <v-chip label color="warning" text-color="white" v-if="items.item.estado == 'INACTIVO'">
                {{ items.item.estado }}
              </v-chip>
            </td>
          </template>
        </crud-table>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>

import CrudTable from '@/common/util/crud-table/CrudTable.vue';
import crud from '@/common/util/crud-table/mixins/crud-table';
import Auth from '@/components/admin/auth/mixins/auth';
import validate from '@/common/mixins/validate';
import usuario from './mixins/usuario';
import PersonaForm from '@/components/admin/persona/PersonaForm';
import LogDatos from '@/components/admin/usuario/LogDatos';
import token from '@/components/admin/modulo/mixins/token';

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'usuario/getField',
  mutationType: 'usuario/updateField'
});

export default {
  mixins: [ crud, validate, Auth, usuario, token ],
  created () {
    this.user = this.$storage.getUser();
    this.username = this.user.usuario;
    this.entidades = [];
    this.getEntidades(0);
    this.roles = [];
    this.getRoles(1);
  },
  data () {
    return {
      logDatos: null,
      operadores: [],
      personaDatos: false,
      graphql: true, // Definiendo el CRUD con Graphql
      url: 'usuarios',
      headers: [
        { text: this.$t('common.actions'), sortable: false },
        { text: this.$t('common.active'), sortable: false },
        { text: this.$t('user.crud.user'), value: 'usuario' },
        { text: this.$t('user.crud.fullname'), value: 'nombre_completo' },
        { text: this.$t('user.crud.email'), value: 'email' },
        { text: this.$t('user.crud.entity'), value: 'id_entidad' },
        { text: this.$t('user.crud.role'), value: 'id_rol' },
        { text: this.$t('user.crud.status'), value: 'estado' }
      ],
      dataGraphql: `
        id
        usuario
        email
        estado
        id_entidad
        id_rol
        persona {
          nombres
          primer_apellido
          segundo_apellido
          telefono
        }
        entidad {
          nombre
        }
        rol {
          nombre
        }
      `,
      dataGraphqlAll: `
        id
        usuario
        email
        cargo
        estado
        id_entidad
        id_rol
        id_persona
        persona {
          nombres
          primer_apellido
          segundo_apellido
          tipo_documento
          tipo_documento_otro
          nro_documento
          fecha_nacimiento
          movil
          nacionalidad
          pais_nacimiento
          genero
          telefono
          estado
        }
        entidad {
          nombre
        }
        rol {
          nombre
        }
        _user_created
        _user_updated
        _created_at
        _updated_at
      `,
      form: {
        usuario: '',
        contrasena: '',
        email: '',
        id_entidad: null,
        id_rol: null
      },
      filters: [
        {
          field: 'id_entidad',
          label: this.$t('user.crud.entity'),
          type: 'select',
          typeG: 'ID',
          items: []
        },
        {
          field: 'id_rol',
          label: this.$t('user.crud.role'),
          type: 'select',
          typeG: 'ID',
          items: []
        },
        {
          field: 'usuario',
          label: this.$t('user.crud.user'),
          type: 'text',
          typeG: 'String'
        },
        {
          field: 'nombre_completo',
          label: this.$t('user.crud.fullname'),
          type: 'text',
          typeG: 'String'
        },
        {
          field: 'email',
          label: this.$t('user.crud.email'),
          type: 'text',
          typeG: 'String'
        },
        {
          field: 'estado',
          label: this.$t('user.crud.status'),
          type: 'select',
          typeG: 'EstadoUsuario',
          items: [
            { value: '', text: 'TODOS' },
            { value: 'ACTIVO', text: 'ACTIVO' },
            { value: 'INACTIVO', text: 'INACTIVO' }
          ]
        }
      ],
      hidePass: true,
      username: null,
      valid: true,
      aeropuertos: []
    };
  },
  computed: {
    getIcon () {
      if (this.contrasena) {
        return this.contrasena.length === 0 ? 'lock' : this.hidePass ? 'visibility' : 'visibility_off';
      }
      return 'lock';
    },
    // Cargando datos del usuario del store
    ...mapFields([
      'form.id',
      'form.usuario',
      'form.contrasena',
      'form.email',
      'form.cargo',
      'form.id_entidad',
      'form.id_rol',
      'form.id_persona'
    ])
  },
  methods: {
    changeIcon () {
      if (this.contrasena && this.contrasena.length) {
        this.hidePass = !this.hidePass;
      }
    },
    openModal (data = {}) {
      this.$refs.form.reset();
      this.$store.commit('setDate', { 'form.fecha_nacimiento': null });
      this.$store.commit('usuario/cleanForm');
      this.logDatos = null;
      if (data.id) {
        this.$nextTick(() => {
          this.logDatos = {
            _user_created: data._user_created,
            _user_updated: data._user_updated,
            _created_at: data._created_at,
            _updated_at: data._updated_at
          };
          this.$store.commit('usuario/setForm', {
            id: data.id,
            usuario: data.usuario,
            email: data.email,
            cargo: data.cargo,
            estado: data.estado,
            id_entidad: data.id_entidad + '',
            id_rol: data.id_rol + '',
            id_persona: data.id_persona,
            tipo_documento: data.persona.tipo_documento,
            tipo_documento_otro: data.persona.tipo_documento_otro,
            nro_documento: data.persona.nro_documento,
            fecha_nacimiento: data.persona.fecha_nacimiento,
            nombres: data.persona.nombres,
            primer_apellido: data.persona.primer_apellido,
            segundo_apellido: data.persona.segundo_apellido,
            nombre_completo: data.persona.nombre_completo,
            telefono: data.persona.telefono,
            movil: data.persona.movil,
            nacionalidad: data.persona.nacionalidad,
            pais_nacimiento: data.persona.pais_nacimiento,
            genero: data.persona.genero,
            estado_persona: data.persona.estado,
            persona: {
              nombres: data.persona.nombres,
              paterno: data.persona.primer_apellido,
              materno: data.persona.segundo_apellido
            }
          });
          if (data.persona.fecha_nacimiento) {
            this.$store.commit('setDate', { 'form.fecha_nacimiento': this.$datetime.transform(data.persona.fecha_nacimiento) });
          }
          this.personaDatos = false;
          this.$nextTick(() => {
            this.personaDatos = true;
          });
        });
      } else {
        this.personaDatos = true;
        this.$store.commit('usuario/cleanForm');
      }
      this.$store.commit('openModal');
    },
    save () {
      if (this.$refs.form.validate()) {
        let data = { ...this.$store.state.usuario.form };
        data.fecha_nacimiento = this.$datetime.format2(this.$store.state.date['form.fecha_nacimiento']);
        delete data.persona;
        if (data.id) {
          const id = data.id;
          delete data.id;
          delete data.contrasena;
          this.$service.graphql({
            query: `
              mutation edit($id: ID!, $usuario: EditUsuario!) {
                usuarioEdit(id: $id, usuario: $usuario) {
                  id
                }
              }
            `,
            variables: {
              id,
              usuario: data
            }
          }).then(response => {
            if (response) {
              if (this.username === this.usuario) {
                this.$message.warning('Sus datos fueron actualizados, debe ingresar de nuevo al sistema.');
                this.logout();
              } else {
                this.$store.commit('closeModal');
                this.updateList();
                this.$message.success('Se actualizó el registro correctamente');
                this.$store.commit('usuario/cleanForm');
              }
            }
          });
        } else {
          delete data.id;
          delete data.id_persona;
          delete data.estado_persona;
          data.estado = 'ACTIVO';
          this.$service.graphql({
            query: `
              mutation add($usuario: NewUsuario!) {
                usuarioAdd(usuario: $usuario) {
                  id
                }
              }
            `,
            variables: {
              usuario: data
            }
          }).then(response => {
            if (response) {
              this.$store.commit('closeModal');
              this.updateList();
              this.$message.success();
              this.$store.commit('usuario/cleanForm');
            }
          });
        }
      }
    }
  },
  components: {
    CrudTable,
    PersonaForm,
    LogDatos
  }
};
</script>
