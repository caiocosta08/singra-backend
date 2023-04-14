import axios from './axios.service';

export const add = async (funcao) => {
  // if (funcao.items === [] || funcao.items == null) return false;
  // if (funcao.price === '' || funcao.price == null) return false;
  // if (funcao.status === '' || funcao.status == null) return false;
  // if (funcao.payment_status === '' || funcao.payment_status == null)
  //   return false;
  // if (funcao.client === '' || funcao.client == null) return false;
  // if (funcao.payment_method === '' || funcao.payment_method == null)
  //   return false;
  // funcao.date = new Date();

  return (await axios.post('/funcoes/', funcao)).data;
};
export const remove = async (funcao_id) => {
  return (await axios.delete('/funcoes/' + funcao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/funcoes/')).data;
};
