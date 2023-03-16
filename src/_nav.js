import React from 'react';
import { CNavItem, CNavTitle } from '@coreui/react';
import { Person } from '@mui/icons-material';

const _nav = [
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Usuários',
    to: '/usuarios',
    icon: <Person style={{ marginRight: 10 }} />,
  },
];

export default _nav;
