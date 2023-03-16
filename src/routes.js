import React from 'react';

const Usuarios = React.lazy(() => import('./views/modules/usuarios/Index'));

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Usuarios },
  { path: '/usuarios', name: 'Usuários', element: Usuarios },
];

export default routes;
