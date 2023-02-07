/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import {
  CButton,
  CCard,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import * as OrdersService from '../../services/orders.service'
import * as UtilsService from '../../services/utils.service'

const Finance = () => {

    // const [orders, setOrders] = React.useState([]);
    const [infoData, setInfoData] = React.useState({
      totalVendidos: 0,
      totalVendidosEmReal: 0,
      totalVendidoPix: 0,
      totalPagoPix: 0,
      totalVendidoDinheiro: 0,
      totalPendentePix: 0,
      totalVendidosSaoFrancisco: 0,
      totalVendidosSantaTeresinha: 0,
      totalVendidosSaoJosemaria: 0,
      totalAvulso: 0,
    })
    const getInfo = (orders) => {
      console.log(orders)
      let pixOrders = orders.filter((o) => o.payment_method === 'pix')
      let valueByPix = 0
      let valuePaidByPix = 0
      let valuePendingByPix = 0
      let totalValue = 0
      pixOrders.map((o) => {
        valueByPix = valueByPix + parseInt(o.price)
        valuePaidByPix = valuePaidByPix + (o.payment_status === 'paid' ? parseInt(o.price) : 0)
        valuePendingByPix = valuePendingByPix + (o.payment_status !== 'paid' ? parseInt(o.price) : 0)
        return o
      })
      orders.map((o) => {
        totalValue = totalValue + parseInt(o.price)
        console.log(totalValue)
        return o
      })
      let totalTeresinha = 0 
      orders.map((o) => {
        totalTeresinha = totalTeresinha + o.items.filter((i) => i.title.includes('Terezinha')).length
      })
      let totalJosemaria = 0 
      orders.map((o) => {
        totalJosemaria = totalJosemaria + o.items.filter((i) => i.title.includes('Josemaría')).length
      })
      let totalFrancisco = 0
      orders.map((o) => {
        totalFrancisco = totalFrancisco + o.items.filter((i) => i.title.includes('Francisco')).length
      })
  
      setInfoData({
        ...infoData,
        totalVendidos: totalValue,
        totalVendidoPix: valueByPix,
        totalPagoPix: valuePaidByPix,
        totalPendentePix: valuePendingByPix,
        totalVendidosEmReal: totalValue,
        totalVendidoDinheiro: totalValue - valueByPix,
        totalVendidosSaoFrancisco: totalFrancisco,
        totalVendidosSantaTeresinha: totalTeresinha,
        totalVendidosSaoJosemaria: totalJosemaria,
      })
    }

    React.useEffect( () => {
      OrdersService.getOrders().then( o => {
        // setOrders(o)
        getInfo(o)
      })
    }, [])

  return (
    <>
      <WidgetsDropdown
        paidPaymentsQuantity={UtilsService.formatMoney(infoData.totalVendidos)}
        paidPaymentsTotalValue={UtilsService.formatMoney(infoData.totalVendidoPix)}
        pendingPaymentsQuantity={UtilsService.formatMoney(infoData.totalPendentePix)}
        pendingPaymentsTotalValue={UtilsService.formatMoney(infoData.totalVendidoDinheiro)}
      /> 
    </>
  )
}

export default Finance
