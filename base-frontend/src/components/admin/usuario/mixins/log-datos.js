'use strict';

export default {
  methods: {
    getLogDatos (data) {
      let datos = {
        _user_created: data._user_created,
        _user_updated: data._user_updated,
        _created_at: data._created_at,
        _updated_at: data._updated_at
      };

      delete data._user_created;
      delete data._user_updated;
      delete data._created_at;
      delete data._updated_at;

      return datos;
    }
  }
};
