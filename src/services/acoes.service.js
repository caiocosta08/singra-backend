import axios from './axios.service';

export const add = async (acao) => {
  // if (acao.items === [] || acao.items == null) return false;
  // if (acao.price === '' || acao.price == null) return false;
  // if (acao.status === '' || acao.status == null) return false;
  // if (acao.payment_status === '' || acao.payment_status == null)
  //   return false;
  // if (acao.client === '' || acao.client == null) return false;
  // if (acao.payment_method === '' || acao.payment_method == null)
  //   return false;
  // acao.date = new Date();

  return (await axios.post('/acoes/', acao)).data;
};
export const remove = async (acao_id) => {
  return (await axios.delete('/acoes/' + acao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/acoes/')).data;
};
