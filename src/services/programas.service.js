import axios from './axios.service';

export const add = async (programa) => {
  // if (programa.items === [] || programa.items == null) return false;
  // if (programa.price === '' || programa.price == null) return false;
  // if (programa.status === '' || programa.status == null) return false;
  // if (programa.payment_status === '' || programa.payment_status == null)
  //   return false;
  // if (programa.client === '' || programa.client == null) return false;
  // if (programa.payment_method === '' || programa.payment_method == null)
  //   return false;
  // programa.date = new Date();

  return (await axios.post('/programas/', programa)).data;
};
export const remove = async (programa_id) => {
  return (await axios.delete('/programas/' + programa_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/programas/')).data;
};
