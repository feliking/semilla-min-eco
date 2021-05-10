import error from './errors';
import validate from './validates';
import menu from './menu';
import vuetify from './vuetify';

export default {
  error,
  validate,
  menu,
  $vuetify: vuetify,
  app: {
    title: 'Base frontend',
    account: 'Mi cuenta',
    settings: 'Configuración',
    logOut: 'Cerrar sesión'
  },
  login: {
    title: 'Ingrese como Usuario',
    title_nit: 'Ingrese como Administrador',
    user: 'Nombre de usuario',
    password: 'Contraseña',
    nit: 'NIT',
    rememberMe: 'Recuerdame',
    forgotPass: '¿Se te olvidó tu contraseña?',
    login: 'Ingresar',
    noAccount: '¿No tienes una cuenta?',
    signUp: 'Registrate aquí'
  },
  common: {
    add: 'Agregar',
    required: 'Campo obligatorio',
    cancel: 'Cancelar',
    save: 'Guardar',
    rowsPage: 'Filas por página',
    updateList: 'Actualizar esta lista',
    filters: 'Filtros/búsqueda',
    of: 'de',
    active: 'Activo',
    observation: 'Observar',
    firm: 'Firmar',
    approve: 'Aprobar y Firmar',
    edit: 'Editar',
    status: 'Estado',
    actions: 'Acciones',
    close: 'Cerrar'
  },
  entity: {
    title: 'Entidades',
    add: 'Agregar nueva entidad',
    crud: {
      edit: 'Editar',
      code: 'Código',
      name: 'Nombre',
      acronym: 'Sigla',
      description: 'Descripción',
      status: 'Estado',
      addEnt: 'Agregar entidad',
      editEnt: 'Editar entidad',
      address: 'Dirección',
      email: 'Correo electrónico de atención al cliente',
      phones: 'Teléfono(s)',
      web: 'Página web de la entidad'
    }
  },
  account: {
    title: 'Cuentas',
    add: 'Agregar nueva cuenta',
    select: 'Seleccione una entidad para ver sus cuentas',
    crud: {
      edit: 'Editar',
      accountNumber: 'Nro. de cuenta',
      status: 'Estado',
      entity: 'Entidad',
      addAc: 'Agregar cuenta',
      editAc: 'Editar cuenta'
    }
  },
  user: {
    title: 'Usuarios',
    add: 'Agregar nuevo usuario',
    crud: {
      edit: 'Editar',
      user: 'Usuario',
      userData: 'Datos del usuario',
      entity: 'Entidad',
      role: 'Rol',
      status: 'Estado',
      addUser: 'Agregar usuario',
      editUser: 'Editar usuario',
      fullname: 'Nombre completo',
      email: 'Correo electrónico'
    }
  },
  rol: {
    title: 'Roles',
    add: 'Agregar nuevo rol',
    crud: {
      name: 'Nombre',
      description: 'Descripción',
      tipo: 'Tipo',
      path: 'Ruta',
      editRol: 'Editar Rol',
      addRol: 'Agregar Rol'
    }
  },
  parametro: {
    title: 'Parámetros',
    add: 'Agregar nuevo parámetro',
    preferencias: 'Preferencias',
    crud: {
      name: 'Nombre',
      value: 'Valor',
      label: 'Label',
      description: 'Descripción',
      editParametro: 'Editar Parámetro',
      addParametro: 'Agregar Parámetro'
    }
  },
  module: {
    title: 'Módulos y permisos',
    add: 'Agregar nuevo módulo',
    crud: {
      edit: 'Editar',
      module: 'Módulo padre',
      label: 'Título',
      path: 'Path',
      icon: 'Ícono',
      order: 'Orden',
      status: 'Estado',
      visible: 'Visible',
      is_visible: 'Es visible',
      submodule: 'Sub módulo',
      section: 'Sección',
      addModule: 'Agregar módulo',
      editModule: 'Editar módulo',
      permissions: 'Permisos'
    }
  },
  log: {
    title: 'Logs del sistema',
    crud: {
      nivel: 'Nivel',
      tipo: 'Tipo',
      mensaje: 'Mensaje',
      referencia: 'Referencia',
      ip: 'IP',
      fecha: 'Fecha de creación',
      usuario: 'Usuario'
    }
  },
  servicioIop: {
    title: 'Interoperabilidad',
    add: 'Agregar nuevo servicio',
    crud: {
      codigo: 'Código',
      metodo: 'Método',
      descripcion: 'Descripción',
      entidad: 'Entidad',
      url: 'Url',
      token: 'Token',
      tipo: 'Tipo',
      estado: 'Estado',
      editServicio: 'Editar Servicio Iop',
      addServicio: 'Agregar Servicio Iop'
    }
  }
};
