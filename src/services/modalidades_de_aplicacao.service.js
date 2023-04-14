import axios from './axios.service';

export const add = async (modalidade_de_aplicacao) => {
  // if (modalidade_de_aplicacao.items === [] || modalidade_de_aplicacao.items == null) return false;
  // if (modalidade_de_aplicacao.price === '' || modalidade_de_aplicacao.price == null) return false;
  // if (modalidade_de_aplicacao.status === '' || modalidade_de_aplicacao.status == null) return false;
  // if (modalidade_de_aplicacao.payment_status === '' || modalidade_de_aplicacao.payment_status == null)
  //   return false;
  // if (modalidade_de_aplicacao.client === '' || modalidade_de_aplicacao.client == null) return false;
  // if (modalidade_de_aplicacao.payment_method === '' || modalidade_de_aplicacao.payment_method == null)
  //   return false;
  // modalidade_de_aplicacao.date = new Date();

  return (await axios.post('/modalidades-de-aplicacao/', modalidade_de_aplicacao)).data;
};
export const remove = async (modalidade_de_aplicacao_id) => {
  return (await axios.delete('/modalidades-de-aplicacao/' + modalidade_de_aplicacao_id)).data;
};
export const getAll = async () => {
  return (await axios.get('/modalidades-de-aplicacao/')).data;
};
