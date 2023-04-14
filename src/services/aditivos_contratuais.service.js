import axios from './axios.service';

export const add = async (aditivo_contratual) => {
  // if (aditivo_contratual.items === [] || aditivo_contratual.items == null) return false;
  // if (aditivo_contratual.price === '' || aditivo_contratual.price == null) return false;
  // if (aditivo_contratual.status === '' || aditivo_contratual.status == null) return false;
  // if (aditivo_contratual.payment_status === '' || aditivo_contratual.payment_status == null)
  //   return false;
  // if (aditivo_contratual.client === '' || aditivo_contratual.client == null) return false;
  // if (aditivo_contratual.payment_method === '' || aditivo_contratual.payment_method == null)
  //   return false;
  // aditivo_contratual.date = new Date();

  return (await axios.post('/aditivos-contratuais/', aditivo_contratual)).data;
};
export const remove = async (aditivo_contratual_id) => {
  return (await axios.delete('/aditivos-contratuais/' + aditivo_contratual_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/aditivos-contratuais/')).data;
};
