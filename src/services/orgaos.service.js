import axios from './axios.service';

export const add = async (orgao) => {
  // if (orgao.items === [] || orgao.items == null) return false;
  // if (orgao.price === '' || orgao.price == null) return false;
  // if (orgao.status === '' || orgao.status == null) return false;
  // if (orgao.payment_status === '' || orgao.payment_status == null)
  //   return false;
  // if (orgao.client === '' || orgao.client == null) return false;
  // if (orgao.payment_method === '' || orgao.payment_method == null)
  //   return false;
  // orgao.date = new Date();

  return (await axios.post('/orgaos/', orgao)).data;
};
export const remove = async (orgao_id) => {
  return (await axios.delete('/orgaos/' + orgao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/orgaos/')).data;
};
