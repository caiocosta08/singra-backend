import axios from './axios.service';

export const add = async (setor_administrativo) => {
  // if (setor_administrativo.items === [] || setor_administrativo.items == null) return false;
  // if (setor_administrativo.price === '' || setor_administrativo.price == null) return false;
  // if (setor_administrativo.status === '' || setor_administrativo.status == null) return false;
  // if (setor_administrativo.payment_status === '' || setor_administrativo.payment_status == null)
  //   return false;
  // if (setor_administrativo.client === '' || setor_administrativo.client == null) return false;
  // if (setor_administrativo.payment_method === '' || setor_administrativo.payment_method == null)
  //   return false;
  // setor_administrativo.date = new Date();

  return (await axios.post('/setores-administrativos/', setor_administrativo)).data;
};
export const remove = async (setor_administrativo_id) => {
  return (await axios.delete('/setores-administrativos/' + setor_administrativo_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/setores-administrativos/')).data;
};
