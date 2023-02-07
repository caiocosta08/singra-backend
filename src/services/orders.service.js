import axios from './axios.service'

export const add = async (order) => {
  if (order.items === [] || order.items == null) return false
  if (order.price === '' || order.price == null) return false
  if (order.status === '' || order.status == null) return false
  if (order.payment_status === '' || order.payment_status == null) return false
  if (order.client === '' || order.client == null) return false
  if (order.payment_method === '' || order.payment_method == null) return false
  order.date = new Date()

  return (await axios.post('/orders/', order)).data
}
export const remove = async (order_id) => {
  return (await axios.delete('/orders/' + order_id)).data
}
export const getOrders = async () => {
  return (await axios.get('/orders/')).data
}
export const deliveryOrder = async (id) => {
  return (await axios.get('/orders/delivery_order/' + id)).data
}
export const receiveOrder = async (id) => {
  return (await axios.get('/orders/receive_order/' + id)).data
}
export const confirmPayment = async (id) => {
  return (await axios.get('/orders/confirm_payment/' + id)).data
}
