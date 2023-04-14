import React from 'react';

const AberturaDeExercicioFinanceiro = React.lazy(() => import('./views/modules/abertura_de_exercicio_financeiro/Index'));
const Acoes = React.lazy(() => import('./views/modules/acoes/Index'));
const AditivosContratuais = React.lazy(() => import('./views/modules/aditivos_contratuais/Index'));
const AgenciasBancarias = React.lazy(() => import('./views/modules/agencias_bancarias/Index'));
const Bairros = React.lazy(() => import('./views/modules/bairros/Index'));
const CargosAdministrativos = React.lazy(() => import('./views/modules/cargos_administrativos/Index'));
const Contratos = React.lazy(() => import('./views/modules/contratos/Index'));
const Credores = React.lazy(() => import('./views/modules/credores/Index'));
const ElementosDeDespesa = React.lazy(() => import('./views/modules/elementos_de_despesa/Index'));
const FontesDeRecursos = React.lazy(() => import('./views/modules/fontes_de_recursos/Index'));
const Funcoes = React.lazy(() => import('./views/modules/funcoes/Index'));
const GruposDeDespesa = React.lazy(() => import('./views/modules/grupos_de_despesa/Index'));
const Instituicoes = React.lazy(() => import('./views/modules/instituicoes/Index'));
const ModalidadesDeAplicacao = React.lazy(() => import('./views/modules/modalidades_de_aplicacao/Index'));
const Municipios = React.lazy(() => import('./views/modules/municipios/Index'));
const NaturezasDeDespesa = React.lazy(() => import('./views/modules/naturezas_de_despesa/Index'));
const Orgaos = React.lazy(() => import('./views/modules/orgaos/Index'));
const Programas = React.lazy(() => import('./views/modules/programas/Index'));
const RedesBancarias = React.lazy(() => import('./views/modules/redes_bancarias/Index'));
const RegionaisDeEstado = React.lazy(() => import('./views/modules/regionais_de_estado/Index'));
const RegionaisDeMunicipio = React.lazy(() => import('./views/modules/regionais_de_municipio/Index'));
const SetoresAdministrativos = React.lazy(() => import('./views/modules/setores_administrativos/Index'));
const Subacoes = React.lazy(() => import('./views/modules/subacoes/Index'));
const Subfuncoes = React.lazy(() => import('./views/modules/subfuncoes/Index'));
const SubelementosDeDespesa = React.lazy(() => import('./views/modules/subelementos_de_despesa/Index'));
const TiposDeCredores = React.lazy(() => import('./views/modules/tipos_de_credores/Index'));
const UnidadesGestoras = React.lazy(() => import('./views/modules/unidades_gestoras/Index'));
const Usuarios = React.lazy(() => import('./views/modules/usuarios/Index'));

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Usuarios },
  { path: '/usuarios', name: 'Usuários', element: Usuarios }, {
    name: 'Abertura de Exercício Financeiro', element: AberturaDeExercicioFinanceiro, path: '/abertura_de_exercicio_financeiro',
  },
  {
    name: 'Ações', element: Acoes, path: '/acoes',
  },
  {
    name: 'Aditivos Contratuais', element: AditivosContratuais, path: '/aditivos_contratuais',
  },
  {
    name: 'Agências Bancárias', element: AgenciasBancarias, path: '/agencias_bancarias',
  },
  {
    name: 'Bairros', element: Bairros, path: '/Bairros',
  },
  {
    name: 'Cargos Administrativos', element: CargosAdministrativos, path: '/cargos_administrativos',
  },
  {
    name: 'Contratos', element: Contratos, path: '/contratos',
  },
  {
    name: 'Credores', element: Credores, path: '/credores',
  },
  {
    name: 'Elementos de Despesa', element: ElementosDeDespesa, path: '/elementos_de_despesa',
  },
  {
    name: 'Fontes de Recursos', element: FontesDeRecursos, path: '/fontes_de_recursos',
  },
  {
    name: 'Funções', element: Funcoes, path: '/funcoes',
  },
  {
    name: 'Grupos de Despesa', element: GruposDeDespesa, path: '/grupos_de_despesa',
  },
  {
    name: 'Instituições', element: Instituicoes, path: '/instituicoes',
  },
  {
    name: 'Modalidades de Aplicação', element: ModalidadesDeAplicacao, path: '/modalidades_de_aplicacao',
  },
  {
    name: 'Municípios', element: Municipios, path: '/municipios',
  },
  {
    name: 'Naturezas de Despesa', element: NaturezasDeDespesa, path: '/naturezas_de_despesa',
  },
  {
    name: 'Órgãos', element: Orgaos, path: '/orgaos',
  },
  {
    name: 'Programas', element: Programas, path: '/programas',
  },
  {
    name: 'Redes Bancárias', element: RedesBancarias, path: '/redes_bancarias',
  },
  {
    name: 'Regionais de Estado', element: RegionaisDeEstado, path: '/regionais_de_estado',
  },
  {
    name: 'Regionais de Município', element: RegionaisDeMunicipio, path: '/regionais_de_municipio',
  },
  {
    name: 'Setores Administrativos', element: SetoresAdministrativos, path: '/setores_administrativos',
  },
  {
    name: 'Subações', element: Subacoes, path: '/subacoes',
  },
  {
    name: 'Subelementos de Despesa', element: SubelementosDeDespesa, path: '/subelementos_de_despesa',
  },
  {
    name: 'Subfunções', element: Subfuncoes, path: '/subfuncoes',
  },
  {
    name: 'Tipos de Credores', element: TiposDeCredores, path: '/tipos_de_credores',
  },
  {
    name: 'Unidades Gestoras', element: UnidadesGestoras, path: '/unidades_gestoras',
  },
  {
    name: 'Usuários', element: Usuarios, path: '/usuarios',
  },
];

export default routes
