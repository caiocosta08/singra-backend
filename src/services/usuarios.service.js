import axios from './axios.service';

export const add = async (usuario) => {
  // if (usuario.items === [] || usuario.items == null) return false;
  // if (usuario.price === '' || usuario.price == null) return false;
  // if (usuario.status === '' || usuario.status == null) return false;
  // if (usuario.payment_status === '' || usuario.payment_status == null)
  //   return false;
  // if (usuario.client === '' || usuario.client == null) return false;
  // if (usuario.payment_method === '' || usuario.payment_method == null)
  //   return false;
  // usuario.date = new Date();

  return (await axios.post('/usuarios/', usuario)).data;
};
export const remove = async (usuario_id) => {
  return (await axios.delete('/usuarios/' + usuario_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/usuarios/')).data;
};
