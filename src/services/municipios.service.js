import axios from './axios.service';

export const add = async (municipio) => {
  // if (municipio.items === [] || municipio.items == null) return false;
  // if (municipio.price === '' || municipio.price == null) return false;
  // if (municipio.status === '' || municipio.status == null) return false;
  // if (municipio.payment_status === '' || municipio.payment_status == null)
  //   return false;
  // if (municipio.client === '' || municipio.client == null) return false;
  // if (municipio.payment_method === '' || municipio.payment_method == null)
  //   return false;
  // municipio.date = new Date();

  return (await axios.post('/municipios/', municipio)).data;
};
export const remove = async (municipio_id) => {
  return (await axios.delete('/municipios/' + municipio_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/municipios/')).data;
};
