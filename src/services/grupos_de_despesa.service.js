import axios from './axios.service';

export const add = async (grupo_de_despesa) => {
  // if (grupo_de_despesa.items === [] || grupo_de_despesa.items == null) return false;
  // if (grupo_de_despesa.price === '' || grupo_de_despesa.price == null) return false;
  // if (grupo_de_despesa.status === '' || grupo_de_despesa.status == null) return false;
  // if (grupo_de_despesa.payment_status === '' || grupo_de_despesa.payment_status == null)
  //   return false;
  // if (grupo_de_despesa.client === '' || grupo_de_despesa.client == null) return false;
  // if (grupo_de_despesa.payment_method === '' || grupo_de_despesa.payment_method == null)
  //   return false;
  // grupo_de_despesa.date = new Date();

  return (await axios.post('/grupos-de-despesa/', grupo_de_despesa)).data;
};
export const remove = async (grupo_de_despesa_id) => {
  return (await axios.delete('/grupos-de-despesa/' + grupo_de_despesa_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/grupos-de-despesa/')).data;
};
