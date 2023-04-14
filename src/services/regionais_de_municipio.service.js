import axios from './axios.service';

export const add = async (regional_de_municipio) => {
  // if (regional_de_municipio.items === [] || regional_de_municipio.items == null) return false;
  // if (regional_de_municipio.price === '' || regional_de_municipio.price == null) return false;
  // if (regional_de_municipio.status === '' || regional_de_municipio.status == null) return false;
  // if (regional_de_municipio.payment_status === '' || regional_de_municipio.payment_status == null)
  //   return false;
  // if (regional_de_municipio.client === '' || regional_de_municipio.client == null) return false;
  // if (regional_de_municipio.payment_method === '' || regional_de_municipio.payment_method == null)
  //   return false;
  // regional_de_municipio.date = new Date();

  return (await axios.post('/regionais-de-municipio/', regional_de_municipio)).data;
};
export const remove = async (regional_de_municipio_id) => {
  return (await axios.delete('/regionais-de-municipio/' + regional_de_municipio_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/regionais-de-municipio/')).data;
};
