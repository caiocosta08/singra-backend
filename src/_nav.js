import React from 'react';
import { CNavItem, CNavTitle } from '@coreui/react';
import { CheckBox, Person } from '@mui/icons-material';

const _nav = [
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Abertura de Ex. Financeiro',
    to: '/abertura_de_exercicio_financeiro',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Ações',
    to: '/acoes',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Aditivos Contratuais',
    to: '/aditivos_contratuais',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Agências Bancárias',
    to: '/agencias_bancarias',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Bairros',
    to: '/Bairros',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Cargos Administrativos',
    to: '/cargos_administrativos',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Contratos',
    to: '/contratos',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Credores',
    to: '/credores',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Elementos de Despesa',
    to: '/elementos_de_despesa',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Fontes de Recursos',
    to: '/fontes_de_recursos',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Funções',
    to: '/funcoes',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Grupos de Despesa',
    to: '/grupos_de_despesa',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Instituições',
    to: '/instituicoes',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Modalidades de Aplicação',
    to: '/modalidades_de_aplicacao',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Municípios',
    to: '/municipios',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Naturezas de Despesa',
    to: '/naturezas_de_despesa',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Órgãos',
    to: '/orgaos',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Programas',
    to: '/programas',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Redes Bancárias',
    to: '/redes_bancarias',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Regionais de Estado',
    to: '/regionais_de_estado',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Regionais de Município',
    to: '/regionais_de_municipio',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Setores Administrativos',
    to: '/setores_administrativos',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Subações',
    to: '/subacoes',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Subelementos de Despesa',
    to: '/subelementos_de_despesa',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Subfunções',
    to: '/subfuncoes',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Tipos de Credores',
    to: '/tipos_de_credores',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Unidades Gestoras',
    to: '/unidades_gestoras',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
  {
    component: CNavItem,
    name: 'Usuários',
    to: '/usuarios',
    icon: <CheckBox style={{ marginRight: 10 }} />,
  },
];

export default _nav;
