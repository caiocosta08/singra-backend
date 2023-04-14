import React from 'react';
import {
  CButton,
  CCard,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import * as CredoresService from '../../../services/credores.service';
import { DataGrid } from '@mui/x-data-grid';
import {
  Alert,
  TextField,
  Snackbar,
  InputLabel,
  Box,
} from '@mui/material';
import {
  Add,
} from '@mui/icons-material';

const Credores = () => {
  const [credorModalVisible, setCredorModalVisible] = React.useState(false);
  const [addCredorModalVisible, setAddCredorModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentCredor, setCurrentCredor] = React.useState({});
  const [credores, setCredores] = React.useState([]);
  const [newCredorData, setNewCredorData] = React.useState({
    tipo_de_credor_id: '',
    cadastro_rfb: '',
    identificador: '',
    nome: '',
    nome_social: '',
    nome_fantasia: '',
    nit_pis_pasep: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    optante_simples: '',
    data_final_opcao_simples: '',
    optante_cprb: '',
    administrador_reponsavel_pela_empresa: '',
    cpf_arpe: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    uf: '',
    municipio_id: '',
    ponto_de_referencia: '',
    telefone_comercial: '',
    telefone_comercial_2: '',
    telefone_residencial: '',
    telefone_celular: '',
    email: '',
    email_2: '',
    banco_id: '',
    agencia_id: '',
    conta_bancaria: '',
    tipo_conta_bancaria: '',
    porte_estabelecimento_pj: '',
    data_abertura_cnpj: '',
    situacao_cadastral: '',
    data_situacao_cadastral: '',
    situacao_de_registro: '',
    observacao: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderCredorModal = () => {
    return (
      <CModal
        visible={credorModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setCredorModalVisible(false)}>
          <CModalTitle>Detalhes do credor</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>ID DO TIPO DE CREDOR: <strong>{currentCredor.tipo_de_credor_id}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>CADASTRO RFB: <strong>{currentCredor.cadastro_rfb}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>IDENTIFICADOR: <strong>{currentCredor.identificador}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>NOME: <strong>{currentCredor.nome}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>NOME SOCIAL: <strong>{currentCredor.nome_social}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>NOME FANTASIA: <strong>{currentCredor.nome_fantasia}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>NIT PIS PASEP: <strong>{currentCredor.nit_pis_pasep}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>INSCRIÇÃO ESTADUAL: <strong>{currentCredor.inscricao_estadual}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>INSCRIÇÃO MUNICIPAL: <strong>{currentCredor.inscricao_municipal}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>OPTANTE SIMPLES: <strong>{currentCredor.optante_simples}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>DATA FINAL OPÇÃO SIMPLES: <strong>{currentCredor.data_final_opcao_simples}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>OPTANTE CPRB: <strong>{currentCredor.optante_cprb}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>ADMINISTRADOR RESPONSÁVEL PELA EMPRESA: <strong>{currentCredor.administrador_reponsavel_pela_empresa}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>CPF ARPE: <strong>{currentCredor.cpf_arpe}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>CEP: <strong>{currentCredor.cep}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>LOGRADOURO: <strong>{currentCredor.logradouro}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>Nº: <strong>{currentCredor.numero}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>COMPLEMENTO: <strong>{currentCredor.complemento}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>BAIRRO: <strong>{currentCredor.bairro}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>UF: <strong>{currentCredor.uf}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>ID DO MUNICÍPIO: <strong>{currentCredor.municipio_id}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>PONTO DE REFERÊNCIA: <strong>{currentCredor.ponto_de_referencia}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>TELEFONE COMERCIAL: <strong>{currentCredor.telefone_comercial}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>TELEFONE COMERCIAL 2: <strong>{currentCredor.telefone_comercial_2}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>TELEFONE RESIDENCIAL: <strong>{currentCredor.telefone_residencial}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>TELEFONE CELULAR: <strong>{currentCredor.telefone_celular}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>EMAIL: <strong>{currentCredor.email}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>EMAIL 2: <strong>{currentCredor.email_2}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>ID DO BANCO: <strong>{currentCredor.banco_id}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>ID DA AGÊNCIA: <strong>{currentCredor.agencia_id}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>CONTA BANCÁRIA: <strong>{currentCredor.conta_bancaria}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>TIPO DE CONTA BANCÁRIA: <strong>{currentCredor.tipo_conta_bancaria}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>PORTE ESTABELECIMENTO PJ: <strong>{currentCredor.porte_estabelecimento_pj}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>DATA ABERTURA CNPJ: <strong>{currentCredor.data_abertura_cnpj}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>SITUAÇÃO CADASTRAL: <strong>{currentCredor.situacao_cadastral}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>DATA SITUAÇÃO CADASTRAL: <strong>{currentCredor.data_situacao_cadastral}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>SITUAÇÃO DE REGISTRO: <strong>{currentCredor.situacao_de_registro}</strong></div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>OBSERVAÇÃO: <strong>{currentCredor.observacao}</strong></div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteCredor(currentCredor.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setCredorModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddCredorModal = () => {
    return (
      <CModal
        visible={addCredorModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddCredorModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Credor</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, tipo_de_credor_id: e.target.value, })}
            defaultValue={newCredorData.tipo_de_credor_id}
            label="Digite o tipo_de_credor_id"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, cadastro_rfb: e.target.value, })}
            defaultValue={newCredorData.cadastro_rfb}
            label="Digite o cadastro_rfb"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, identificador: e.target.value, })}
            defaultValue={newCredorData.identificador}
            label="Digite o identificador"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, nome: e.target.value, })}
            defaultValue={newCredorData.nome}
            label="Digite o nome"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, nome_social: e.target.value, })}
            defaultValue={newCredorData.nome_social}
            label="Digite o nome_social"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, nome_fantasia: e.target.value, })}
            defaultValue={newCredorData.nome_fantasia}
            label="Digite o nome_fantasia"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, nit_pis_pasep: e.target.value, })}
            defaultValue={newCredorData.nit_pis_pasep}
            label="Digite o nit_pis_pasep"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, inscricao_estadual: e.target.value, })}
            defaultValue={newCredorData.inscricao_estadual}
            label="Digite o inscricao_estadual"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, inscricao_municipal: e.target.value, })}
            defaultValue={newCredorData.inscricao_municipal}
            label="Digite o inscricao_municipal"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, optante_simples: e.target.value, })}
            defaultValue={newCredorData.optante_simples}
            label="Digite o optante_simples"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, data_final_opcao_simples: e.target.value, })}
            defaultValue={newCredorData.data_final_opcao_simples}
            label="Digite o data_final_opcao_simples"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, optante_cprb: e.target.value, })}
            defaultValue={newCredorData.optante_cprb}
            label="Digite o optante_cprb"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, administrador_reponsavel_pela_empresa: e.target.value, })}
            defaultValue={newCredorData.administrador_reponsavel_pela_empresa}
            label="Digite o administrador_reponsavel_pela_empresa"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, cpf_arpe: e.target.value, })}
            defaultValue={newCredorData.cpf_arpe}
            label="Digite o cpf_arpe"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, cep: e.target.value, })}
            defaultValue={newCredorData.cep}
            label="Digite o cep"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, logradouro: e.target.value, })}
            defaultValue={newCredorData.logradouro}
            label="Digite o logradouro"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, numero: e.target.value, })}
            defaultValue={newCredorData.numero}
            label="Digite o numero"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, complemento: e.target.value, })}
            defaultValue={newCredorData.complemento}
            label="Digite o complemento"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, bairro: e.target.value, })}
            defaultValue={newCredorData.bairro}
            label="Digite o bairro"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, uf: e.target.value, })}
            defaultValue={newCredorData.uf}
            label="Digite o uf"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, municipio_id: e.target.value, })}
            defaultValue={newCredorData.municipio_id}
            label="Digite o municipio_id"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, ponto_de_referencia: e.target.value, })}
            defaultValue={newCredorData.ponto_de_referencia}
            label="Digite o ponto_de_referencia"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, telefone_comercial: e.target.value, })}
            defaultValue={newCredorData.telefone_comercial}
            label="Digite o telefone_comercial"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, telefone_comercial_2: e.target.value, })}
            defaultValue={newCredorData.telefone_comercial_2}
            label="Digite o telefone_comercial_2"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, telefone_residencial: e.target.value, })}
            defaultValue={newCredorData.telefone_residencial}
            label="Digite o telefone_residencial"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, telefone_celular: e.target.value, })}
            defaultValue={newCredorData.telefone_celular}
            label="Digite o telefone_celular"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, email: e.target.value, })}
            defaultValue={newCredorData.email}
            label="Digite o email"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, email_2: e.target.value, })}
            defaultValue={newCredorData.email_2}
            label="Digite o email_2"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, banco_id: e.target.value, })}
            defaultValue={newCredorData.banco_id}
            label="Digite o banco_id"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, agencia_id: e.target.value, })}
            defaultValue={newCredorData.agencia_id}
            label="Digite o agencia_id"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, conta_bancaria: e.target.value, })}
            defaultValue={newCredorData.conta_bancaria}
            label="Digite o conta_bancaria"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, tipo_conta_bancaria: e.target.value, })}
            defaultValue={newCredorData.tipo_conta_bancaria}
            label="Digite o tipo_conta_bancaria"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, porte_estabelecimento_pj: e.target.value, })}
            defaultValue={newCredorData.porte_estabelecimento_pj}
            label="Digite o porte_estabelecimento_pj"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, data_abertura_cnpj: e.target.value, })}
            defaultValue={newCredorData.data_abertura_cnpj}
            label="Digite o data_abertura_cnpj"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, situacao_cadastral: e.target.value, })}
            defaultValue={newCredorData.situacao_cadastral}
            label="Digite o situacao_cadastral"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, data_situacao_cadastral: e.target.value, })}
            defaultValue={newCredorData.data_situacao_cadastral}
            label="Digite o data_situacao_cadastral"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, situacao_de_registro: e.target.value, })}
            defaultValue={newCredorData.situacao_de_registro}
            label="Digite o situacao_de_registro"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
          <TextField
            onChange={(e) => setNewCredorData({ ...newCredorData, observacao: e.target.value, })}
            defaultValue={newCredorData.observacao}
            label="Digite o observacao"
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddCredorModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addCredor(newCredorData).then((res) =>
                res ? addSuccess() : {},
              )
            }
          >
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const addCredor = async (credor) => {
    const status = await CredoresService.add(credor);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Credor adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar credor.',
        severity: 'error',
      });
    return status;
  };

  const deleteCredor = async (credor_id) => {
    const status = await CredoresService.remove(credor_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Credor excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir credor.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddCredorModalVisible(false);
    setNewCredorData({
      tipo_de_credor_id: '',
      cadastro_rfb: '',
      identificador: '',
      nome: '',
      nome_social: '',
      nome_fantasia: '',
      nit_pis_pasep: '',
      inscricao_estadual: '',
      inscricao_municipal: '',
      optante_simples: '',
      data_final_opcao_simples: '',
      optante_cprb: '',
      administrador_reponsavel_pela_empresa: '',
      cpf_arpe: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      uf: '',
      municipio_id: '',
      ponto_de_referencia: '',
      telefone_comercial: '',
      telefone_comercial_2: '',
      telefone_residencial: '',
      telefone_celular: '',
      email: '',
      email_2: '',
      banco_id: '',
      agencia_id: '',
      conta_bancaria: '',
      tipo_conta_bancaria: '',
      porte_estabelecimento_pj: '',
      data_abertura_cnpj: '',
      situacao_cadastral: '',
      data_situacao_cadastral: '',
      situacao_de_registro: '',
      observacao: '',
    });
    atualizarCredores();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'tipo_de_credor_id', headerName: 'tipo_de_credor_id', width: 220 },
    { field: 'cadastro_rfb', headerName: 'cadastro_rfb', width: 220 },
    { field: 'identificador', headerName: 'identificador', width: 220 },
    { field: 'nome', headerName: 'nome', width: 220 },
    { field: 'nome_social', headerName: 'nome_social', width: 220 },
    { field: 'nome_fantasia', headerName: 'nome_fantasia', width: 220 },
    { field: 'nit_pis_pasep', headerName: 'nit_pis_pasep', width: 220 },
    { field: 'inscricao_estadual', headerName: 'inscricao_estadual', width: 220 },
    { field: 'inscricao_municipal', headerName: 'inscricao_municipal', width: 220 },
    { field: 'optante_simples', headerName: 'optante_simples', width: 220 },
    { field: 'data_final_opcao_simples', headerName: 'data_final_opcao_simples', width: 220 },
    { field: 'optante_cprb', headerName: 'optante_cprb', width: 220 },
    { field: 'administrador_reponsavel_pela_empresa', headerName: 'administrador_reponsavel_pela_empresa', width: 220 },
    { field: 'cpf_arpe', headerName: 'cpf_arpe', width: 220 },
    { field: 'cep', headerName: 'cep', width: 220 },
    { field: 'logradouro', headerName: 'logradouro', width: 220 },
    { field: 'numero', headerName: 'numero', width: 220 },
    { field: 'complemento', headerName: 'complemento', width: 220 },
    { field: 'bairro', headerName: 'bairro', width: 220 },
    { field: 'uf', headerName: 'uf', width: 220 },
    { field: 'municipio_id', headerName: 'municipio_id', width: 220 },
    { field: 'ponto_de_referencia', headerName: 'ponto_de_referencia', width: 220 },
    { field: 'telefone_comercial', headerName: 'telefone_comercial', width: 220 },
    { field: 'telefone_comercial_2', headerName: 'telefone_comercial_2', width: 220 },
    { field: 'telefone_residencial', headerName: 'telefone_residencial', width: 220 },
    { field: 'telefone_celular', headerName: 'telefone_celular', width: 220 },
    { field: 'email', headerName: 'email', width: 220 },
    { field: 'email_2', headerName: 'email_2', width: 220 },
    { field: 'banco_id', headerName: 'banco_id', width: 220 },
    { field: 'agencia_id', headerName: 'agencia_id', width: 220 },
    { field: 'conta_bancaria', headerName: 'conta_bancaria', width: 220 },
    { field: 'tipo_conta_bancaria', headerName: 'tipo_conta_bancaria', width: 220 },
    { field: 'porte_estabelecimento_pj', headerName: 'porte_estabelecimento_pj', width: 220 },
    { field: 'data_abertura_cnpj', headerName: 'data_abertura_cnpj', width: 220 },
    { field: 'situacao_cadastral', headerName: 'situacao_cadastral', width: 220 },
    { field: 'data_situacao_cadastral', headerName: 'data_situacao_cadastral', width: 220 },
    { field: 'situacao_de_registro', headerName: 'situacao_de_registro', width: 220 },
    { field: 'observacao', headerName: 'observacao', width: 220 },
  ];

  const deleteSuccess = async () => {
    setCredorModalVisible(false);
    setCurrentCredor({
      id: '',
      tipo_de_credor_id: '',
      cadastro_rfb: '',
      identificador: '',
      nome: '',
      nome_social: '',
      nome_fantasia: '',
      nit_pis_pasep: '',
      inscricao_estadual: '',
      inscricao_municipal: '',
      optante_simples: '',
      data_final_opcao_simples: '',
      optante_cprb: '',
      administrador_reponsavel_pela_empresa: '',
      cpf_arpe: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      uf: '',
      municipio_id: '',
      ponto_de_referencia: '',
      telefone_comercial: '',
      telefone_comercial_2: '',
      telefone_residencial: '',
      telefone_celular: '',
      email: '',
      email_2: '',
      banco_id: '',
      agencia_id: '',
      conta_bancaria: '',
      tipo_conta_bancaria: '',
      porte_estabelecimento_pj: '',
      data_abertura_cnpj: '',
      situacao_cadastral: '',
      data_situacao_cadastral: '',
      situacao_de_registro: '',
      observacao: '',
    });
    atualizarCredores();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentCredor(row);
    setCredorModalVisible(true);
  };

  const atualizarCredores = async () => {
    const credoresAtualizados = await CredoresService.getAll();
    setCredores(credoresAtualizados);
  };

  React.useEffect(() => {
    atualizarCredores();
  }, []);

  return (
    <>
      {credorModalVisible && renderCredorModal()}
      {addCredorModalVisible && renderAddCredorModal()}
      {addItemModalVisible && (
        <ModalAddItem
          visible={addItemModalVisible}
          onClose={() => setAddItemModalVisible(false)}
          onAdd={(item) =>
            addItemAndUpdatePrice({ ...item, id: item.id + new Date() })
          }
        />
      )}

      <CCard
        className="mb-4"
        style={{
          overflowX: 'hidden',
          overflow: 'auto',
          height: '80vh',
          paddingBottom: 50,
        }}
      >
        {alertBox.visible && (
          <Snackbar
            open={alertBox.visible}
            autoHideDuration={3000}
            onClose={() => setAlertBox({ ...alertBox, visible: false })}
          >
            <Alert
              severity={alertBox.severity}
              onClose={() => setAlertBox({ ...alertBox, visible: false })}
            >
              {alertBox.text}
            </Alert>
          </Snackbar>
        )}
        <div style={{ padding: 10, display: 'flex', width: 360 }}>
          <CButton
            style={{ margin: 10 }}
            color="primary"
            onClick={() => setAddCredorModalVisible(true)}
          >
            Adicionar Credor <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Credores</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={credores}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            onRowClick={handleOnClickRow}
          />
        </Box>
      </CCard>
    </>
  );
};

export default Credores;
