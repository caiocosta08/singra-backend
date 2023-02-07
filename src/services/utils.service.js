export const formatMoney = (text) => 'R$'+ (text / 100).toLocaleString('pt-br', {
    minimumFractionDigits: 2,
  })