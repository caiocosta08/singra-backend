import axios from './axios.service';

export const add = async (bairro) => {
  // if (bairro.items === [] || bairro.items == null) return false;
  // if (bairro.price === '' || bairro.price == null) return false;
  // if (bairro.status === '' || bairro.status == null) return false;
  // if (bairro.payment_status === '' || bairro.payment_status == null)
  //   return false;
  // if (bairro.client === '' || bairro.client == null) return false;
  // if (bairro.payment_method === '' || bairro.payment_method == null)
  //   return false;
  // bairro.date = new Date();

  return (await axios.post('/bairros/', bairro)).data;
};
export const remove = async (bairro_id) => {
  return (await axios.delete('/bairros/' + bairro_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/bairros/')).data;
};
