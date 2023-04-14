import axios from './axios.service';

export const add = async (regional_de_estado) => {
  // if (regional_de_estado.items === [] || regional_de_estado.items == null) return false;
  // if (regional_de_estado.price === '' || regional_de_estado.price == null) return false;
  // if (regional_de_estado.status === '' || regional_de_estado.status == null) return false;
  // if (regional_de_estado.payment_status === '' || regional_de_estado.payment_status == null)
  //   return false;
  // if (regional_de_estado.client === '' || regional_de_estado.client == null) return false;
  // if (regional_de_estado.payment_method === '' || regional_de_estado.payment_method == null)
  //   return false;
  // regional_de_estado.date = new Date();

  return (await axios.post('/regionais-de-estado/', regional_de_estado)).data;
};
export const remove = async (regional_de_estado_id) => {
  return (await axios.delete('/regionais-de-estado/' + regional_de_estado_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/regionais-de-estado/')).data;
};
