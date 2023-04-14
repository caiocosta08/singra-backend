import axios from './axios.service';

export const add = async (rede_bancaria) => {
  // if (rede_bancaria.items === [] || rede_bancaria.items == null) return false;
  // if (rede_bancaria.price === '' || rede_bancaria.price == null) return false;
  // if (rede_bancaria.status === '' || rede_bancaria.status == null) return false;
  // if (rede_bancaria.payment_status === '' || rede_bancaria.payment_status == null)
  //   return false;
  // if (rede_bancaria.client === '' || rede_bancaria.client == null) return false;
  // if (rede_bancaria.payment_method === '' || rede_bancaria.payment_method == null)
  //   return false;
  // rede_bancaria.date = new Date();

  return (await axios.post('/redes-bancarias/', rede_bancaria)).data;
};
export const remove = async (rede_bancaria_id) => {
  return (await axios.delete('/redes-bancarias/' + rede_bancaria_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/redes-bancarias/')).data;
};
