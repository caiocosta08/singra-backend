import axios from './axios.service';

export const add = async (tipo_de_credor) => {
  // if (tipo_de_credor.items === [] || tipo_de_credor.items == null) return false;
  // if (tipo_de_credor.price === '' || tipo_de_credor.price == null) return false;
  // if (tipo_de_credor.status === '' || tipo_de_credor.status == null) return false;
  // if (tipo_de_credor.payment_status === '' || tipo_de_credor.payment_status == null)
  //   return false;
  // if (tipo_de_credor.client === '' || tipo_de_credor.client == null) return false;
  // if (tipo_de_credor.payment_method === '' || tipo_de_credor.payment_method == null)
  //   return false;
  // tipo_de_credor.date = new Date();

  return (await axios.post('/tipos-de-credores/', tipo_de_credor)).data;
};
export const remove = async (tipo_de_credor_id) => {
  return (await axios.delete('/tipos-de-credores/' + tipo_de_credor_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/tipos-de-credores/')).data;
};
