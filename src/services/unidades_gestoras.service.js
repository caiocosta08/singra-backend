import axios from './axios.service';

export const add = async (unidade_gestora) => {
  // if (unidade_gestora.items === [] || unidade_gestora.items == null) return false;
  // if (unidade_gestora.price === '' || unidade_gestora.price == null) return false;
  // if (unidade_gestora.status === '' || unidade_gestora.status == null) return false;
  // if (unidade_gestora.payment_status === '' || unidade_gestora.payment_status == null)
  //   return false;
  // if (unidade_gestora.client === '' || unidade_gestora.client == null) return false;
  // if (unidade_gestora.payment_method === '' || unidade_gestora.payment_method == null)
  //   return false;
  // unidade_gestora.date = new Date();

  return (await axios.post('/unidades-gestoras/', unidade_gestora)).data;
};
export const remove = async (unidade_gestora_id) => {
  return (await axios.delete('/unidades-gestoras/' + unidade_gestora_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/unidades-gestoras/')).data;
};
