import axios from './axios.service';

export const add = async (fonte_de_recurso) => {
  // if (fonte_de_recurso.items === [] || fonte_de_recurso.items == null) return false;
  // if (fonte_de_recurso.price === '' || fonte_de_recurso.price == null) return false;
  // if (fonte_de_recurso.status === '' || fonte_de_recurso.status == null) return false;
  // if (fonte_de_recurso.payment_status === '' || fonte_de_recurso.payment_status == null)
  //   return false;
  // if (fonte_de_recurso.client === '' || fonte_de_recurso.client == null) return false;
  // if (fonte_de_recurso.payment_method === '' || fonte_de_recurso.payment_method == null)
  //   return false;
  // fonte_de_recurso.date = new Date();

  return (await axios.post('/fontes-de-recursos/', fonte_de_recurso)).data;
};
export const remove = async (fonte_de_recurso_id) => {
  return (await axios.delete('/fontes-de-recursos/' + fonte_de_recurso_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/fontes-de-recursos/')).data;
};
