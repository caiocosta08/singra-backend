import React from 'react'
// import Products from './views/products/Products'
import Finance from './views/finance/Finance'

const Orders = React.lazy(() => import('./views/orders/Orders'))

const routes = [
  { path: '/', exact: true, name: 'Pedidos', element: Orders },
  { path: '/orders', name: 'Pedidos', element: Orders },
  { path: '/finance', name: 'Financeiro', element: Finance },
  // { path: '/products', name: 'Produtos', element: Products },
]

export default routes
