import axios from './axios.service';

export const add = async (abertura_de_exercicio_financeiro) => {
  // if (abertura_de_exercicio_financeiro.items === [] || abertura_de_exercicio_financeiro.items == null) return false;
  // if (abertura_de_exercicio_financeiro.price === '' || abertura_de_exercicio_financeiro.price == null) return false;
  // if (abertura_de_exercicio_financeiro.status === '' || abertura_de_exercicio_financeiro.status == null) return false;
  // if (abertura_de_exercicio_financeiro.payment_status === '' || abertura_de_exercicio_financeiro.payment_status == null)
  //   return false;
  // if (abertura_de_exercicio_financeiro.client === '' || abertura_de_exercicio_financeiro.client == null) return false;
  // if (abertura_de_exercicio_financeiro.payment_method === '' || abertura_de_exercicio_financeiro.payment_method == null)
  //   return false;
  // abertura_de_exercicio_financeiro.date = new Date();

  return (await axios.post('/abertura-de-exercicio-financeiro/', abertura_de_exercicio_financeiro)).data;
};
export const remove = async (abertura_de_exercicio_financeiro_id) => {
  return (await axios.delete('/abertura-de-exercicio-financeiro/' + abertura_de_exercicio_financeiro_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/abertura-de-exercicio-financeiro/')).data;
};
