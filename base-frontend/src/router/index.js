import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/admin/Dashboard';
import AppNotFound from '@/common/layout/pages/AppNotFound';
import AppForbidden from '@/common/layout/pages/AppForbidden';
import AppError from '@/common/layout/pages/AppError';

// System
import Login from '@/components/admin/auth/Login';
import LoginCiudadania from '@/components/admin/auth/LoginCiudadania';
import LoginNit from '@/components/admin/auth/LoginNit';
import Account from '@/components/admin/account/Account';
import Entidad from '@/components/admin/entidad/Entidad';
import Usuario from '@/components/admin/usuario/Usuario';
import Modulo from '@/components/admin/modulo/Modulo';
import Preferencias from '@/components/admin/preferencias/Preferencias';
import Log from '@/components/admin/Log';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login-ciudadania',
      name: 'LoginCiudadania',
      component: LoginCiudadania
    },
    {
      path: '/login-nit',
      name: 'LoginNit',
      component: LoginNit
    },
    {
      path: '/usuarios',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/entidades',
      name: 'Entidad',
      component: Entidad
    },
    {
      path: '/parametros',
      name: 'Preferencias',
      component: Preferencias
    },
    {
      path: '/modulos',
      name: 'Módulo',
      component: Modulo
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Log
    },
    {
      path: '/404',
      component: AppNotFound
    },
    {
      path: '/403',
      component: AppForbidden
    },
    {
      path: '/500',
      component: AppError
    },
    {
      path: '*',
      component: AppNotFound
    }
  ]
});
