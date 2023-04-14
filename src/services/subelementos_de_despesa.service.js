import axios from './axios.service';

export const add = async (subelementos_de_despesa) => {
  // if (subelementos_de_despesa.items === [] || subelementos_de_despesa.items == null) return false;
  // if (subelementos_de_despesa.price === '' || subelementos_de_despesa.price == null) return false;
  // if (subelementos_de_despesa.status === '' || subelementos_de_despesa.status == null) return false;
  // if (subelementos_de_despesa.payment_status === '' || subelementos_de_despesa.payment_status == null)
  //   return false;
  // if (subelementos_de_despesa.client === '' || subelementos_de_despesa.client == null) return false;
  // if (subelementos_de_despesa.payment_method === '' || subelementos_de_despesa.payment_method == null)
  //   return false;
  // subelementos_de_despesa.date = new Date();

  return (await axios.post('/subelementos-de-despesa/', subelementos_de_despesa)).data;
};
export const remove = async (subelementos_de_despesa_id) => {
  return (await axios.delete('/subelementos-de-despesa/' + subelementos_de_despesa_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/subelementos-de-despesa/')).data;
};
