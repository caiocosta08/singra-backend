import axios from './axios.service';

export const add = async (credor) => {
  // if (credor.items === [] || credor.items == null) return false;
  // if (credor.price === '' || credor.price == null) return false;
  // if (credor.status === '' || credor.status == null) return false;
  // if (credor.payment_status === '' || credor.payment_status == null)
  //   return false;
  // if (credor.client === '' || credor.client == null) return false;
  // if (credor.payment_method === '' || credor.payment_method == null)
  //   return false;
  // credor.date = new Date();

  return (await axios.post('/credores/', credor)).data;
};
export const remove = async (credor_id) => {
  return (await axios.delete('/credores/' + credor_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/credores/')).data;
};
