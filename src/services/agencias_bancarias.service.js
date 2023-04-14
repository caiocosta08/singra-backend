import axios from './axios.service';

export const add = async (agencia_bancaria) => {
  // if (agencia_bancaria.items === [] || agencia_bancaria.items == null) return false;
  // if (agencia_bancaria.price === '' || agencia_bancaria.price == null) return false;
  // if (agencia_bancaria.status === '' || agencia_bancaria.status == null) return false;
  // if (agencia_bancaria.payment_status === '' || agencia_bancaria.payment_status == null)
  //   return false;
  // if (agencia_bancaria.client === '' || agencia_bancaria.client == null) return false;
  // if (agencia_bancaria.payment_method === '' || agencia_bancaria.payment_method == null)
  //   return false;
  // agencia_bancaria.date = new Date();

  return (await axios.post('/agencias-bancarias/', agencia_bancaria)).data;
};
export const remove = async (agencia_bancaria_id) => {
  return (await axios.delete('/agencias-bancarias/' + agencia_bancaria_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/agencias-bancarias/')).data;
};
