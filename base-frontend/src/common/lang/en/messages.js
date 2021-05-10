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
    account: 'My account',
    settings: 'Settings',
    logOut: 'Logout'
  },
  login: {
    title: 'Login',
    user: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPass: 'Forgot password?',
    login: 'Login',
    noAccount: 'Dont have an account?',
    signUp: 'Signup here'
  },
  common: {
    add: 'Add',
    required: 'Required',
    cancel: 'Cancel',
    save: 'Save',
    rowsPage: 'Rows per page',
    updateList: 'Update list',
    filters: 'Filters/Search',
    of: 'of',
    active: 'Active',
    observation: 'Observation',
    firm: 'Firm',
    edit: 'Edit',
    status: 'State',
    actions: 'Actions',
    close: 'Cerrar'
  },
  entity: {
    title: 'Entities',
    add: 'Add new entity',
    crud: {
      edit: 'Edit',
      name: 'Name',
      code: 'Code',
      acronym: 'Acronym',
      description: 'Description',
      status: 'Status',
      addEnt: 'Add entity',
      editEnt: 'Edit entity',
      address: 'Address',
      email: 'Correo electrónico',
      phones: 'Teléfono(s)',
      web: 'Página web de la institución',
      user_ppte: 'Usuario en el sistema PPTE',
      pass_ppte: 'Contraseña en el sistema PPTE'
    }
  },
  account: {
    title: 'Accounts',
    add: 'Add new account',
    select: 'Choose an entity to see its accounts',
    crud: {
      edit: 'Edit',
      accountNumber: 'Account number',
      status: 'Status',
      entity: 'Entity',
      addAc: 'Add account',
      editAc: 'Edit account'
    }
  },
  user: {
    title: 'Users',
    add: 'Add new user',
    crud: {
      edit: 'Edit',
      user: 'User',
      userData: 'User info',
      entity: 'Entity',
      role: 'Role',
      status: 'Status',
      addUser: 'Add user',
      editUser: 'Edit user',
      fullname: 'Fullname',
      email: 'Email'
    }
  },
  rol: {
    title: 'Roles',
    add: 'Add new rol',
    crud: {
      name: 'Name',
      description: 'Description',
      tipo: 'Type',
      path: 'Rute',
      editRol: 'Edit Rol',
      addRol: 'Add Rol'
    }
  },
  parametro: {
    title: 'Parameters',
    add: 'Add new parameter',
    preferencias: 'Preferences',
    crud: {
      name: 'Name',
      value: 'Value',
      label: 'Label',
      description: 'Description',
      editParametro: 'Edit parameter',
      addParametro: 'Add paremeter'
    }
  },
  module: {
    title: 'Modules',
    add: 'Add new',
    crud: {
      edit: 'Edit',
      module: 'Module',
      label: 'Title',
      path: 'Path',
      icon: 'Icon',
      order: 'Order',
      status: 'State',
      visible: 'Visible',
      is_visible: 'Is visible',
      submodule: 'Sub module',
      section: 'Section',
      addModule: 'Add module',
      editModule: 'Edit module',
      permissions: 'Permissions'
    }
  },
  log: {
    title: 'Logs',
    crud: {
      nivel: 'Level',
      tipo: 'Type',
      mensaje: 'Message',
      referencia: 'Reference',
      ip: 'IP',
      fecha: 'Date created',
      usuario: 'User'
    }
  },
  servicioIop: {
    title: 'Interoperability',
    add: 'Add new service',
    crud: {
      codigo: 'Code',
      metodo: 'Method',
      descripcion: 'Description',
      entidad: 'Entity',
      url: 'Url',
      token: 'Token',
      tipo: 'Type',
      estado: 'State',
      editServicio: 'Edit service IOP',
      addServicio: 'Add service IOP'
    }
  }
};
