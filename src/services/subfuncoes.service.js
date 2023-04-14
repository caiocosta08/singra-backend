import axios from './axios.service';

export const add = async (subfuncao) => {
  // if (subfuncao.items === [] || subfuncao.items == null) return false;
  // if (subfuncao.price === '' || subfuncao.price == null) return false;
  // if (subfuncao.status === '' || subfuncao.status == null) return false;
  // if (subfuncao.payment_status === '' || subfuncao.payment_status == null)
  //   return false;
  // if (subfuncao.client === '' || subfuncao.client == null) return false;
  // if (subfuncao.payment_method === '' || subfuncao.payment_method == null)
  //   return false;
  // subfuncao.date = new Date();

  return (await axios.post('/subfuncoes/', subfuncao)).data;
};
export const remove = async (subfuncao_id) => {
  return (await axios.delete('/subfuncoes/' + subfuncao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/subfuncoes/')).data;
};
