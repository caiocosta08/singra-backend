import axios from './axios.service';

export const add = async (natureza_de_despesa) => {
  // if (natureza_de_despesa.items === [] || natureza_de_despesa.items == null) return false;
  // if (natureza_de_despesa.price === '' || natureza_de_despesa.price == null) return false;
  // if (natureza_de_despesa.status === '' || natureza_de_despesa.status == null) return false;
  // if (natureza_de_despesa.payment_status === '' || natureza_de_despesa.payment_status == null)
  //   return false;
  // if (natureza_de_despesa.client === '' || natureza_de_despesa.client == null) return false;
  // if (natureza_de_despesa.payment_method === '' || natureza_de_despesa.payment_method == null)
  //   return false;
  // natureza_de_despesa.date = new Date();

  return (await axios.post('/naturezas-de-despesa/', natureza_de_despesa)).data;
};
export const remove = async (natureza_de_despesa_id) => {
  return (await axios.delete('/naturezas-de-despesa/' + natureza_de_despesa_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/naturezas-de-despesa/')).data;
};
