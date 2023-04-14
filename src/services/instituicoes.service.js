import axios from './axios.service';

export const add = async (instituicao) => {
  // if (instituicao.items === [] || instituicao.items == null) return false;
  // if (instituicao.price === '' || instituicao.price == null) return false;
  // if (instituicao.status === '' || instituicao.status == null) return false;
  // if (instituicao.payment_status === '' || instituicao.payment_status == null)
  //   return false;
  // if (instituicao.client === '' || instituicao.client == null) return false;
  // if (instituicao.payment_method === '' || instituicao.payment_method == null)
  //   return false;
  // instituicao.date = new Date();

  return (await axios.post('/instituicoes/', instituicao)).data;
};
export const remove = async (instituicao_id) => {
  return (await axios.delete('/instituicoes/' + instituicao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/instituicoes/')).data;
};
