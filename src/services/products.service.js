import axios from './axios.service'

export const add = async (product) => {
  if (product.items === [] || product.items == null) return false
  if (product.price === '' || product.price == null) return false
  if (product.status === '' || product.status == null) return false
  if (product.payment_status === '' || product.payment_status == null) return false
  if (product.client === '' || product.client == null) return false
  if (product.payment_method === '' || product.payment_method == null) return false
  product.date = new Date()

  return (await axios.post('/products/', product)).data
}
export const remove = async (product_id) => {
  return (await axios.delete('/products/' + product_id)).data
}
export const getProducts = async () => {
  return (await axios.get('/products/')).data
}
