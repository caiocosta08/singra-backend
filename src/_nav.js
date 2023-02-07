import React from 'react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { ListAlt, Money, RoomService } from '@mui/icons-material'

const _nav = [
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Pedidos',
    to: '/orders',
    icon: <RoomService style={{ marginRight: 10}} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Produtos',
  //   to: '/products',
  //   icon: <ListAlt style={{ marginRight: 10}} />,
  // },
  {
    component: CNavItem,
    name: 'Financeiro',
    to: '/finance',
    icon: <Money style={{ marginRight: 10}} />,
  },
]

export default _nav
