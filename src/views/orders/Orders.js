import React from 'react';
import PropTypes from 'prop-types';

import {
  CButton,
  CCard,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import * as OrdersService from '../../services/orders.service';
import { DataGrid } from '@mui/x-data-grid';
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
} from '@mui/material';
import ModalAddItem from './ModalAddItem';
import { Button } from '@coreui/coreui';
import {
  Add,
  Money,
  List,
  DeliveryDining,
  RoomService,
  SoupKitchen,
  AttachMoney,
  FoodBank,
} from '@mui/icons-material';

import io from 'socket.io-client';
const socket = io('https://goldfish-app-4t6d6.ondigitalocean.app/');

const BasicCard = (props) => {
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: props.color }}
      style={{ margin: 10, width: 200, height: 200, color: '#fff' }}
    >
      <CardContent onClick={props.onClick}>
        <Typography variant="h5" component="div">
          {props.order.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.order.description !== ''
            ? 'OBS: ' + props.order.description
            : ''}{' '}
          <div>
            <AttachMoney /> {props.payment_status}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

BasicCard.propTypes = {
  onClick: PropTypes.func,
  order: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Orders = () => {
  const [orderModalVisible, setOrderModalVisible] = React.useState(false);
  const [addOrderModalVisible, setAddOrderModalVisible] = React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [newOrderData, setNewOrderData] = React.useState({
    items: [],
    price: 0,
    status: 'pending',
    payment_status: 'pending',
    client: '',
    payment_method: '',
    date: '',
    description: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

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
  });

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('refresh_orders', (data) => {
    console.log('here');
    setOrders(data.reverse());
  });

  const addItemAndUpdatePrice = (item) => {
    let tempItems = newOrderData.items;
    let exists = tempItems.findIndex((i) => i._id == item._id);

    if (exists < 0) {
      tempItems.push({ ...item, quantity: 1 });
    } else {
      tempItems[exists].quantity = tempItems[exists].quantity + 1;
    }
    setNewOrderData({
      ...newOrderData,
      price: newOrderData.price + item.price,
      items: tempItems,
    });
  };

  const removeItemAndUpdatePrice = (item) => {
    let tempItems = newOrderData.items;
    let exists = tempItems.findIndex((i) => i._id == item._id);
    if (exists < 0) {
    } else {
      if (tempItems[exists].quantity === 1) {
        tempItems = tempItems.filter((i) => i._id !== item._id);
      } else if (tempItems[exists].quantity > 1)
        tempItems[exists].quantity = tempItems[exists].quantity - 1;
    }
    setNewOrderData({
      ...newOrderData,
      price: newOrderData.price - item.price,
      items: tempItems,
    });
  };

  const getTextStatus = (status) => {
    return data.statuses.filter((i) => i.data === status)[0].title;
  };
  const getTextPaymentStatus = (payment_status) => {
    return data.payment_statuses.filter((i) => i.data === payment_status)[0]
      .title;
  };

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
    totalArtesanal: 0,
  });
  const getInfo = (orders) => {
    let pixOrders = orders.filter((o) => o.payment_method === 'pix');
    let valueByPix = 0;
    let valuePaidByPix = 0;
    let valuePendingByPix = 0;
    let totalValue = 0;
    let totalArtesanal = 0;
    pixOrders.map((o) => {
      valueByPix = valueByPix + parseInt(o.price);
      valuePaidByPix =
        valuePaidByPix + (o.payment_status === 'paid' ? parseInt(o.price) : 0);
      valuePendingByPix =
        valuePendingByPix +
        (o.payment_status !== 'paid' ? parseInt(o.price) : 0);
      return o;
    });
    orders.map((o) => {
      totalValue = totalValue + parseInt(o.price);
      return o;
    });
    let totalTeresinha = 0;
    orders.map((o) => {
      o.items.filter((i) => {
        if (i.title.includes('Terezinha')) {
          totalTeresinha = totalTeresinha + i.quantity;
          totalArtesanal = totalArtesanal + i.quantity;
        }
      });
    });
    let totalJosemaria = 0;
    orders.map((o) => {
      o.items.filter((i) => {
        if (i.title.includes('Josemaría')) {
          totalJosemaria = totalJosemaria + i.quantity;
          totalArtesanal = totalArtesanal + i.quantity;
        }
      });
    });
    let totalFrancisco = 0;
    orders.map((o) => {
      let temp = [];
      temp = o.items.filter((i) => {
        if (i.title.includes('Francisco')) {
          totalFrancisco = totalFrancisco + i.quantity;
        }
      }).length;
    });

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
      totalArtesanal: totalArtesanal,
    });
  };

  React.useEffect(() => {
    // setInterval(() => {
    update();
    // }, 3500);
  }, []);

  const renderOrderModal = () => {
    return (
      <CModal
        visible={orderModalVisible}
        onClose={() => setOrderModalVisible(false)}
      >
        <CModalHeader onClose={() => setOrderModalVisible(false)}>
          <CModalTitle>Detalhes do pedido</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentOrder._id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Cliente: <strong>{currentOrder.client}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Status: <strong>{getTextStatus(currentOrder.status)}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Observações: <strong>{currentOrder.description}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Items:{' '}
          {currentOrder?.items.map((i) => {
            return (
              <div key={i.title} style={{ fontWeight: 'bold' }}>
                {i.title} - QTD: ({i.quantity})
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Valor:{' R$'}
          <strong>
            {(currentOrder.price / 100).toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
          </strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Método de Pagamento: <strong>{currentOrder.payment_method}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Hora do pedido: <strong>{currentOrder.date}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Status do Pagamento:{' '}
          <strong>{getTextPaymentStatus(currentOrder.payment_status)}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => pay(currentOrder._id) && setOrderModalVisible(false)}
          >
            PAGAR <AttachMoney />
          </CButton>
          <CButton
            style={{ backgroundColor: '#ff9800', borderColor: '#ff9800' }}
            onClick={() =>
              receive(currentOrder._id) && setOrderModalVisible(false)
            }
          >
            RECEBER <SoupKitchen />
          </CButton>
          <CButton
            style={{ backgroundColor: '#00a934', borderColor: '#00a934' }}
            onClick={() =>
              delivery(currentOrder._id) && setOrderModalVisible(false)
            }
          >
            ENTREGAR <RoomService />
          </CButton>
          <CButton
            color="secondary"
            onClick={() =>
              deleteOrder(currentOrder._id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddOrderModal = () => {
    return (
      <CModal
        visible={addOrderModalVisible}
        onClose={() => setAddOrderModalVisible(false)}
      >
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
            onChange={(e) =>
              setNewOrderData({ ...newOrderData, client: e.target.value })
            }
            defaultValue={newOrderData.client}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Cliente"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrderData({ ...newOrderData, description: e.target.value })
            }
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
                <div style={{ marginBottom: 5 }} key={i.id}>
                  {' - '}
                  <strong>
                    {i.title} -{' R$'}
                    {(i.price / 100).toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })}
                    {' (QTD: ' + i.quantity + ')'}
                  </strong>
                  <CButton
                    color="secondary"
                    onClick={() => removeItemAndUpdatePrice(i)}
                  >
                    Excluir
                  </CButton>
                </div>
              );
            })}
          <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newOrderData.payment_method}
            onChange={(event) => {
              setNewOrderData({
                ...newOrderData,
                payment_method: event.target.value,
              });
            }}
          >
            <MenuItem value="pix">Pix</MenuItem>
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
          </Select>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddItemModalVisible(true)}
          >
            Adicionar Item
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setAddOrderModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addOrder(newOrderData).then((res) => (res ? addSuccess() : {}))
            }
          >
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const addOrder = async (order) => {
    const status = await OrdersService.add(order);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Pedido adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar pedido.',
        severity: 'error',
      });
    return status;
  };

  const deleteOrder = async (order_id) => {
    const status = await OrdersService.remove(order_id);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Pedido excluído com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir pedido.',
        severity: 'error',
      });
    return status;
  };

  const addSuccess = async () => {
    setAddOrderModalVisible(false);
    setNewOrderData({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    });
  };

  const update = async () => {
    await OrdersService.getOrders().then((r) => {
      setOrders(r.reverse());
      getInfo(r.reverse());
    });
  };

  const delivery = async (id) => {
    await OrdersService.deliveryOrder(id);
    update();
  };

  const pay = async (id) => {
    await OrdersService.confirmPayment(id);
    update();
  };

  const receive = async (id) => {
    await OrdersService.receiveOrder(id);
    update();
  };

  const deleteSuccess = async () => {
    setOrderModalVisible(false);
    setCurrentOrder({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    });
  };

  const handleOnClickRow = (row) => {
    setCurrentOrder(row);
    setOrderModalVisible(true);
  };
  const getColor = (status) => {
    if (status == 'pending') return '#96110f';
    if (status == 'order_received') return '#FC852D';
    if (status == 'order_delivered') return '#137107';
  };

  return (
    <>
      {orderModalVisible && renderOrderModal()}
      {addOrderModalVisible && renderAddOrderModal()}
      {addItemModalVisible && (
        <ModalAddItem
          visible={addItemModalVisible}
          onClose={() => setAddItemModalVisible(false)}
          onAdd={(item) =>
            addItemAndUpdatePrice({ ...item, id: item.id + new Date() })
          }
        />
      )}

      <CCard
        className="mb-4"
        style={{
          overflowX: 'hidden',
          overflow: 'auto',
          height: '80vh',
          paddingBottom: 50,
        }}
      >
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
          <CButton
            style={{ margin: 10, width: 300, backgroundColor: '#123a88' }}
            onClick={() => setAddOrderModalVisible(true)}
          >
            <FoodBank style={{ color: '#fff' }} /> Artesanais:{' '}
            {infoData.totalArtesanal}
          </CButton>
          <CButton
            style={{ margin: 10, width: 300, backgroundColor: '#123a88' }}
            onClick={() => setAddOrderModalVisible(true)}
          >
            <FoodBank style={{ color: '#fff' }} /> São Francisco:{' '}
            {infoData.totalVendidosSaoFrancisco}
          </CButton>
        </div>
        <CCardHeader>Pedidos</CCardHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 5,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {orders &&
            orders?.map((o) => {
              return (
                <BasicCard
                  status={getTextStatus(o.status)}
                  payment_status={getTextPaymentStatus(o.payment_status)}
                  color={getColor(o.status)}
                  onClick={() => handleOnClickRow(o)}
                  order={o}
                  key={o._id}
                />
              );
            })}
        </div>
      </CCard>
    </>
  );
};

export default Orders;
