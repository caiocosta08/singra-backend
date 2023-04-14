import axios from './axios.service';

export const add = async (contrato) => {
  // if (contrato.items === [] || contrato.items == null) return false;
  // if (contrato.price === '' || contrato.price == null) return false;
  // if (contrato.status === '' || contrato.status == null) return false;
  // if (contrato.payment_status === '' || contrato.payment_status == null)
  //   return false;
  // if (contrato.client === '' || contrato.client == null) return false;
  // if (contrato.payment_method === '' || contrato.payment_method == null)
  //   return false;
  // contrato.date = new Date();

  return (await axios.post('/contratos/', contrato)).data;
};
export const remove = async (contrato_id) => {
  return (await axios.delete('/contratos/' + contrato_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/contratos/')).data;
};
