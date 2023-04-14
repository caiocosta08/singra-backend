import axios from './axios.service';

export const add = async (subacao) => {
  // if (subacao.items === [] || subacao.items == null) return false;
  // if (subacao.price === '' || subacao.price == null) return false;
  // if (subacao.status === '' || subacao.status == null) return false;
  // if (subacao.payment_status === '' || subacao.payment_status == null)
  //   return false;
  // if (subacao.client === '' || subacao.client == null) return false;
  // if (subacao.payment_method === '' || subacao.payment_method == null)
  //   return false;
  // subacao.date = new Date();

  return (await axios.post('/subacoes/', subacao)).data;
};
export const remove = async (subacao_id) => {
  return (await axios.delete('/subacoes/' + subacao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/subacoes/')).data;
};
