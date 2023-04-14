import axios from './axios.service';

export const add = async (cargo_administrativo) => {
  // if (cargo_administrativo.items === [] || cargo_administrativo.items == null) return false;
  // if (cargo_administrativo.price === '' || cargo_administrativo.price == null) return false;
  // if (cargo_administrativo.status === '' || cargo_administrativo.status == null) return false;
  // if (cargo_administrativo.payment_status === '' || cargo_administrativo.payment_status == null)
  //   return false;
  // if (cargo_administrativo.client === '' || cargo_administrativo.client == null) return false;
  // if (cargo_administrativo.payment_method === '' || cargo_administrativo.payment_method == null)
  //   return false;
  // cargo_administrativo.date = new Date();

  return (await axios.post('/cargos-administrativos/', cargo_administrativo)).data;
};
export const remove = async (cargo_administrativo_id) => {
  return (await axios.delete('/cargos-administrativos/' + cargo_administrativo_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/cargos-administrativos/')).data;
};
