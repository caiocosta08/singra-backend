import React from 'react'
import PropTypes from 'prop-types'

import {
  CButton,
  CCard,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import * as OrdersService from '../../services/orders.service'
import { DataGrid } from '@mui/x-data-grid'
import {
  Alert,
  TextField,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import ModalAddItem from './ModalAddItem'
import { Button } from '@coreui/coreui'
import { Add, Money, List, DeliveryDining, RoomService, SoupKitchen, AttachMoney } from '@mui/icons-material'



import io from 'socket.io-client';
const socket = io('http://192.168.1.113:3000');


const BasicCard = (props) => {
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: props.color }}
      style={{ margin: 10, width: 200 }}
    >
      <CardContent onClick={props.onClick}>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {props.order.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.status}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.order.description !== '' ? 'OBS: ' + props.order.description : ''}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.order.date}
        </Typography> */}
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
  )
}

BasicCard.propTypes = {
  // visible: PropTypes.bool,
  // onAdd: PropTypes.func,
  onClick: PropTypes.func,
  order: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
}

const Products = () => {
  const [orderModalVisible, setOrderModalVisible] = React.useState(false)
  const [addOrderModalVisible, setAddOrderModalVisible] = React.useState(false)
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false)
  const [currentOrder, setCurrentOrder] = React.useState({})
  const [orders, setOrders] = React.useState([])
  const [newOrderData, setNewOrderData] = React.useState({
    items: [],
    price: 0,
    status: 'pending',
    payment_status: 'pending',
    client: '',
    payment_method: '',
    date: '',
    description: '',
  })
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  })

  const [data, setData] = React.useState({
    payment_statuses: [
      { id: 1, title: 'Pendente', data: 'pending' },
      { id: 2, title: 'Pago', data: 'paid' },
    ],
    statuses: [
      { id: 1, title: 'Pendente', data: 'pending' },
      { id: 2, title: 'Recebido', data: 'order_received' },
      { id: 3, title: 'Entregue', data: 'order_delivered' },
    ],
  })

  socket.on('refresh_orders', (new_orders) => {
    console.log('refresh_orders', new_orders)
    setOrders(new_orders.reverse())
  });

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected.')
    })

  }, []);

  const addItemAndUpdatePrice = (item) => {
    let tempItems = newOrderData.items
    tempItems.push(item)
    setNewOrderData({ ...newOrderData, price: newOrderData.price + item.price, items: tempItems })
  }

  const removeItemAndUpdatePrice = (item) => {
    let tempItems = newOrderData.items
    tempItems = tempItems.filter((i) => i.id !== item.id)
    setNewOrderData({ ...newOrderData, price: newOrderData.price - item.price, items: tempItems })
  }

  const getTextStatus = (status) => {
    return data.statuses.filter((i) => i.data === status)[0].title
  }
  const getTextPaymentStatus = (payment_status) => {
    return data.payment_statuses.filter((i) => i.data === payment_status)[0].title
  }

  const renderOrderModal = () => {
    return (
      <CModal visible={orderModalVisible} onClose={() => setOrderModalVisible(false)}>
        <CModalHeader onClose={() => setOrderModalVisible(false)}>
          <CModalTitle>Detalhes do pedido</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Código: <strong>{currentOrder._id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Cliente: <strong>{currentOrder.client}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Status: <strong>{getTextStatus(currentOrder.status)}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Observações: <strong>{currentOrder.description}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Items:{' '}
          {currentOrder?.items.map((i) => {
            return <div key={i.title}>{i.title}</div>
          })}
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Valor:{' R$'}
          <strong>
            {(currentOrder.price / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Método de Pagamento: <strong>{currentOrder.payment_method}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Hora do pedido: <strong>{currentOrder.date}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10}}>
          Status do Pagamento: <strong>{getTextPaymentStatus(currentOrder.payment_status)}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => pay(currentOrder._id) && setOrderModalVisible(false)}
          >
            PAGAR <AttachMoney />
          </CButton>
          <CButton
            style={{  backgroundColor: '#ff9800', borderColor: '#ff9800'}}
            onClick={() => receive(currentOrder._id) && setOrderModalVisible(false)}
          >
            RECEBER <SoupKitchen />
          </CButton>
          <CButton
            style={{  backgroundColor: '#00a934', borderColor: '#00a934'}}
            onClick={() => delivery(currentOrder._id) && setOrderModalVisible(false)}
          >
            ENTREGAR <RoomService />
          </CButton>
          <CButton
            color="secondary"
            onClick={() =>
              deleteOrder(currentOrder._id).then((res) => (res ? deleteSuccess() : {}))
            }
          >
            Excluir
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  const renderAddOrderModal = () => {
    return (
      <CModal visible={addOrderModalVisible} onClose={() => setAddOrderModalVisible(false)}>
        <CModalHeader onClose={() => setAddOrderModalVisible(false)}>
          <CModalTitle>Adicionar Pedido</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>
            Valor total:{' R$'}
            {(newOrderData.price / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </InputLabel>
          <TextField
            onChange={(e) => setNewOrderData({ ...newOrderData, client: e.target.value })}
            defaultValue={newOrderData.client}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Cliente"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewOrderData({ ...newOrderData, description: e.target.value })}
            defaultValue={newOrderData.description}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Observação"
            variant="filled"
          />
          <InputLabel style={{ marginBottom: 10, marginTop: 10 }}>
            Itens ({newOrderData?.items?.length || 0})
          </InputLabel>
          {newOrderData?.items &&
            newOrderData?.items.map((i) => {
              return (
                // <div key={i.id + new Date()}>
                <div style={{ marginBottom: 5 }} key={i.id}>
                  {' - '}
                  <strong>
                    {i.title} -{' R$'}
                    {(i.price / 100).toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })}{' '}
                  </strong>
                  <CButton color="secondary" onClick={() => removeItemAndUpdatePrice(i)}>
                    Excluir
                  </CButton>
                </div>
              )
            })}
          <InputLabel style={{ marginBottom: 10 }}>Método de Pagamento</InputLabel>
          <Select
            value={newOrderData.payment_method}
            onChange={(event) => {
              setNewOrderData({ ...newOrderData, payment_method: event.target.value })
            }}
          >
            <MenuItem value="pix">Pix</MenuItem>
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
          </Select>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAddItemModalVisible(true)}>
            Adicionar Item
          </CButton>
          <CButton color="secondary" onClick={() => setAddOrderModalVisible(false)}>
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() => addOrder(newOrderData).then((res) => (res ? addSuccess() : {}))}
          >
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  const addOrder = async (order) => {
    const status = await OrdersService.add(order)
    if (status)
      setAlertBox({ visible: true, text: 'Pedido adicionado com sucesso!', severity: 'success' })
    else setAlertBox({ visible: true, text: 'Erro ao adicionar usuário.', severity: 'error' })
    return status
  }

  const deleteOrder = async (order_id) => {
    const status = await OrdersService.remove(order_id)
    if (status)
      setAlertBox({ visible: true, text: 'Pedido excluído com sucesso!', severity: 'success' })
    else setAlertBox({ visible: true, text: 'Erro ao excluir usuário.', severity: 'error' })
    return status
  }

  const addSuccess = async () => {
    setAddOrderModalVisible(false)
    setNewOrderData({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    })
  }

  const update = async () => {
    setOrders([])
    await OrdersService.getOrders().then((r) => {
      setOrders(r.reverse())
    })
  }

  const delivery = async (id) => {
    await OrdersService.deliveryOrder(id)
  }

  const pay = async (id) => {
    await OrdersService.confirmPayment(id)
  }

  const receive = async (id) => {
    await OrdersService.receiveOrder(id)
  }
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
  const getInfo = () => {
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
      return o
    })
    let totalTeresinha = -2 // -2 avulsos
    orders.map((o) => {
      totalTeresinha = totalTeresinha + o.items.filter((i) => i.title.includes('Teresinha')).length
    })
    let totalJosemaria = -1 // -1 avulso
    orders.map((o) => {
      totalJosemaria = totalJosemaria + o.items.filter((i) => i.title.includes('Josemaria')).length
    })
    let totalFrancisco = 0
    orders.map((o) => {
      totalFrancisco = totalFrancisco + o.items.filter((i) => i.title.includes('Francisco')).length
    })

    setInfoData({
      ...infoData,
      totalVendidoPix: valueByPix,
      totalPagoPix: valuePaidByPix,
      totalPendentePix: valuePendingByPix,
      totalVendidosEmReal: totalValue,
      totalVendidoDinheiro: totalValue - valueByPix,
      totalVendidosSaoFrancisco: totalFrancisco,
      totalVendidosSantaTeresinha: totalTeresinha,
      totalVendidosSaoJosemaria: totalJosemaria,
      totalAvulso: 3,
    })
  }

  // cynthia pagou 33 e nao 30
  /* 
  
  
  */

  const deleteSuccess = async () => {
    setOrderModalVisible(false)
    setCurrentOrder({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    })
  }

  React.useEffect(() => {
    OrdersService.getOrders().then((r) => {
      setOrders(r.reverse())
    })
  }, [])

  React.useEffect(() => {
    getInfo()
  }, [orders])

  const orderColumns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'client',
      headerName: 'Cliente',
      width: 180,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      valueGetter: (params) => `${getTextStatus(params.row.status)}`,
    },
    {
      field: 'date',
      headerName: 'Hora do pedido',
      width: 200,
      // valueGetter: (params) => `${getTextStatus(params.row.status)}`,
    },
    {
      field: 'price',
      headerName: 'Valor',
      width: 150,
      valueGetter: (params) =>
        `R$${(params.row.price / 100).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
        }) || ''
        }`,
    },
    {
      field: 'payment_status',
      headerName: 'Pagamento',
      width: 300,
      valueGetter: (params) => `${getTextPaymentStatus(params.row.payment_status)}`,
    },
  ]

  const handleOnClickRow = (row) => {
    setCurrentOrder(row)
    setOrderModalVisible(true)
  }
  const getColor = (status) => {
    console.log(status)
    // //payment_status
    if (status == 'pending') return 'red'
    if (status == 'order_received') return 'orange'
    if (status == 'order_delivered') return 'green'
    // if (status == 'pending') return 'red'
    // if (status == 'paid') return 'green'
  }

  return (
    <>
      {orderModalVisible && renderOrderModal()}
      {addOrderModalVisible && renderAddOrderModal()}
      {addItemModalVisible && (
        <ModalAddItem
          visible={addItemModalVisible}
          onClose={() => setAddItemModalVisible(false)}
          onAdd={(item) => addItemAndUpdatePrice({ ...item, id: item.id + new Date() })}
        />
      )}

      <CCard className="mb-4" style={{ overflowX: "hidden", overflow: 'auto', height: '80vh', paddingBottom: 50 }}>
        {alertBox.visible && (
          <Snackbar
            open={alertBox.visible}
            autoHideDuration={3000}
            onClose={() => setAlertBox({ ...alertBox, visible: false })}
          >
            <Alert
              severity={alertBox.severity}
              onClose={() => setAlertBox({ ...alertBox, visible: false })}
            >
              {alertBox.text}
            </Alert>
          </Snackbar>
        )}
        <div style={{ padding: 10, display: 'flex', width: 360 }}>
          <CButton
            style={{ margin: 10 }}
            color="primary"
            onClick={() => setAddOrderModalVisible(true)}
          >
            Adicionar Pedido <Add style={{ color: '#fff' }} />
          </CButton>
          {/* <CButton style={{ margin: 10 }} color="primary">
            Total Vendido:{' R$'}
            {(infoData.totalVendidosEmReal / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </CButton>
          <CButton style={{ margin: 10 }} color="primary">
            Total Vendido em Dinheiro:{' R$'}
            {(infoData.totalVendidoDinheiro / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </CButton>
          <CButton style={{ margin: 10 }} color="primary">
            Total Vendido Pix:{' R$'}
            {(infoData.totalVendidoPix / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </CButton>
          <CButton style={{ margin: 10 }} color="primary">
            Total Pago Pix:{' R$'}
            {(infoData.totalPagoPix / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </CButton>
          <CButton
            style={{ margin: 10, backgroundColor: 'red', borderColor: 'red' }}
            color="primary"
          >
            Total Pendente Pix:{' R$'}
            {(infoData.totalPendentePix / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </CButton>
          <CButton
            style={{ margin: 10, backgroundColor: '#022750', borderColor: '#022750' }}
            color="primary"
          >
            {'Teresinha (QTD): '} {infoData.totalVendidosSantaTeresinha + ' - R$' + infoData.totalVendidosSantaTeresinha * 30}
          </CButton>
          <CButton
            style={{ margin: 10, backgroundColor: '#022750', borderColor: '#022750' }}
            color="primary"
          >
            {'Josemaría (QTD): '} {infoData.totalVendidosSaoJosemaria + ' - R$' + infoData.totalVendidosSaoJosemaria * 25}
          </CButton>
          <CButton
            style={{ margin: 10, backgroundColor: '#022750', borderColor: '#022750' }}
            color="primary"
          >
            {'Francisco (QTD): '} {infoData.totalVendidosSaoFrancisco + ' - R$' + infoData.totalVendidosSaoFrancisco * 15}
          </CButton>
          <CButton
            style={{ margin: 10, backgroundColor: '#022750', borderColor: '#022750' }}
            color="primary"
          >
            {'Avulsos (QTD): '} {infoData.totalAvulso + ' - R$' + infoData.totalAvulso * 10}
          </CButton> */}

          {/* totalVendidos: 0,
    totalVendidosEmReal: 0,
    totalVendidoPix: 0,
    totalPagoPix: 0,
    totalVendidoDinheiro: 0,
    totalPendentePix: 0,
    totalVendidosSaoFrancisco: 0,
    totalVendidosSantaTeresinha: 0,
    totalVendidosSaoJosemaria: 0,
    
    420 teresinha
    300 josemaria
    225 sao francisco
    30 avulso

    total: 
    
    
    */}
        </div>
        <CCardHeader>Pedidos</CCardHeader>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-evenly' }}>
          {orders &&
            orders?.map((o) => {
              return (
                <BasicCard
                  status={getTextStatus(o.status)}
                  color={getColor(o.status)}
                  onClick={() => handleOnClickRow(o)}
                  order={o}
                  key={o._id}
                />
              )
            })}
        </div>
      </CCard>
    </>
  )
}

export default Products
