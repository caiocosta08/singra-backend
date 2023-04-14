import axios from './axios.service';

export const add = async (elemento_de_despesa) => {
  // if (elemento_de_despesa.items === [] || elemento_de_despesa.items == null) return false;
  // if (elemento_de_despesa.price === '' || elemento_de_despesa.price == null) return false;
  // if (elemento_de_despesa.status === '' || elemento_de_despesa.status == null) return false;
  // if (elemento_de_despesa.payment_status === '' || elemento_de_despesa.payment_status == null)
  //   return false;
  // if (elemento_de_despesa.client === '' || elemento_de_despesa.client == null) return false;
  // if (elemento_de_despesa.payment_method === '' || elemento_de_despesa.payment_method == null)
  //   return false;
  // elemento_de_despesa.date = new Date();

  return (await axios.post('/elementos-de-despesa/', elemento_de_despesa)).data;
};
export const remove = async (elemento_de_despesa_id) => {
  return (await axios.delete('/elementos-de-despesa/' + elemento_de_despesa_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/elementos-de-despesa/')).data;
};
