<template>
  <section>
    <!-- <h3 class="primary--text"><v-icon color="primary">business</v-icon> {{ $t('parametro.title') }}</h3> -->
    <v-card>
      <v-card-text>
        <crud-table
          :headers="headers"
          :url="url"
          :filters="filters"
          :graphql="graphql"
        >
          <template slot="buttons">
            <v-tooltip bottom v-if="$store.state.permissions['parametros:create']">
             <v-btn color="primary" dark
               @click.stop="openModal()"
               slot="activator"
             ><v-icon dark>add</v-icon> {{$t('common.add') }}</v-btn>
             <span>{{$t('parametro.add')}}</span>
           </v-tooltip>
          </template>

          <template slot="form">
            <v-card-title class="headline">
              <v-icon>business</v-icon> {{ form.id ? $t('parametro.crud.editParametro') :  $t('parametro.crud.addParametro') }}
              <v-spacer />
              <v-btn icon @click="$store.commit('closeModal')">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-form
              @submit.prevent="save"
              v-model="valid"
              ref="form"
              lazy-validation
              >
              <v-card-text>

                <v-container grid-list-md>
                <v-text-field
                  name="nombre"
                  :label="$t('parametro.crud.name')"
                  id="nombre"
                  :rules="$validate(['required'])"
                  required
                  v-model="form.nombre"
                  maxlength="50"
                  :disabled="$store.state.user.id_rol == 2"
                ></v-text-field>

                <v-textarea
                  name="valor"
                  :label="$t('parametro.crud.value')"
                  id="valor"
                  :rules="$validate(['required'])"
                  required
                  v-model="form.valor"
                  maxlength="50"
                ></v-textarea>

                <v-text-field
                  name="label"
                  :label="$t('parametro.crud.label')"
                  id="label"
                  :rules="$validate(['required'])"
                  required
                  v-model="form.label"
                  maxlength="50"
                  :disabled="$store.state.user.id_rol == 2"
                ></v-text-field>

                <v-text-field
                  name="descripcion"
                  :label="$t('parametro.crud.description')"
                  id="descripcion"
                  v-model="form.descripcion"
                  :disabled="$store.state.user.id_rol == 2"
                ></v-text-field>

                </v-container>
                <log-datos :data="logDatos" v-if="logDatos"></log-datos>
              </v-card-text>
              <v-card-actions>
                <small class="error--text text-required">* Los campos son obligatorios</small>
                <v-spacer></v-spacer>
                <v-btn
                  @click="$store.commit('closeModal');">
                  <v-icon>cancel</v-icon> {{$t('common.cancel') }}
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="!valid">
                  <v-icon dark>check</v-icon> {{$t('common.save') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </template>

          <template slot="items" slot-scope="items">
            <td class="nowrap">
              <v-tooltip bottom v-if="$store.state.permissions['parametros:update']">
                <v-btn
                  icon
                  slot="activator"
                  @click="editItem(parseInt(items.item.id), 'parametro', dataGraphql)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$store.state.permissions['parametros:delete']">
                <v-btn
                  icon
                  slot="activator"
                  @click="deleteItem(parseInt(items.item.id), 'parametro')">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
                <span>Eliminar registro</span>
              </v-tooltip>
            </td>
            <td>{{ items.item.nombre }}</td>
            <td>
              <v-tooltip bottom>
                <span slot="activator">{{ $filter.characters(items.item.valor, 50) }}</span>
                <span>{{ items.item.valor }}</span>
              </v-tooltip>
            </td>
            <td>{{ items.item.label }}</td>
            <td>{{ items.item.descripcion }}</td>
          </template>
        </crud-table>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>

import CrudTable from '@/common/util/crud-table/CrudTable.vue';
import crud from '@/common/util/crud-table/mixins/crud-table';
import validate from '@/common/mixins/validate';
import LogDatos from '@/components/admin/usuario/LogDatos';
import logDatos from '@/components/admin/usuario/mixins/log-datos';

export default {
  mixins: [ crud, validate, logDatos ],
  created () {
    this.user = this.$storage.getUser();
  },
  data () {
    return {
      logDatos: null,
      graphql: true, // Definiendo el CRUD con Graphql
      url: 'parametros',
      headers: [
        { text: this.$t('common.actions'), sortable: false },
        { text: this.$t('parametro.crud.name'), value: 'nombre' },
        { text: this.$t('parametro.crud.value'), value: 'valor' },
        { text: this.$t('parametro.crud.label'), value: 'label' },
        { text: this.$t('parametro.crud.description'), value: 'descripcion' }
      ],
      form: {
        nombre: '',
        valor: '',
        label: '',
        descripcion: ''
      },
      dataGraphql: `
        id
        nombre
        valor
        label
        descripcion
        _user_created
        _user_updated
        _created_at
        _updated_at
      `,
      filters: [
        {
          field: 'nombre',
          label: this.$t('parametro.crud.name'),
          type: 'text',
          typeG: 'String'
        },
        {
          field: 'valor',
          label: this.$t('parametro.crud.value'),
          type: 'text',
          typeG: 'String'
        }
      ],
      valid: true
    };
  },
  methods: {
    openModal (data = {}) {
      this.$refs.form.reset();
      this.logDatos = null;
      if (data.id) {
        this.$nextTick(() => {
          this.logDatos = this.getLogDatos(data);
          this.form = data;
        });
      } else {
        this.form = {
          nombre: '',
          valor: '',
          label: '',
          descripcion: ''
        };
      }
      this.$store.commit('openModal');
    },
    save () {
      if (this.$refs.form.validate()) {
        let data = Object.assign({}, this.form);
        if (data.id) {
          delete data.id;
          this.$service.graphql({
            query: `
              mutation edit($id: Int!, $parametro: EditParametro!) {
                parametroEdit(id: $id, parametro: $parametro) {
                  id
                }
              }
            `,
            variables: {
              id: parseInt(this.form.id),
              parametro: data
            }
          }).then(response => {
            if (response) {
              this.$store.commit('closeModal');
              this.updateList();
              this.$message.success('Se actualizó el registro correctamente');
            }
          });
        } else {
          this.$service.graphql({
            query: `
              mutation add($parametro: NewParametro!) {
                parametroAdd(parametro: $parametro) {
                  id
                }
              }
            `,
            variables: {
              parametro: data
            }
          }).then(response => {
            if (response) {
              this.$store.commit('closeModal');
              this.updateList();
              this.$message.success();
            }
          });
        }
      }
    }
  },
  components: {
    CrudTable,
    LogDatos
  }
};
</script>
