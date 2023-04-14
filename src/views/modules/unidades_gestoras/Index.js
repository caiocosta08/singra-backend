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
import * as UnidadesGestorasService from '../../../services/unidades_gestoras.service';
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

const UnidadesGestoras = () => {
  const [unidadeGestoraModalVisible, setUnidadeGestoraModalVisible] = React.useState(false);
  const [addUnidadeGestoraModalVisible, setAddUnidadeGestoraModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentUnidadeGestora, setCurrentUnidadeGestora] = React.useState({});
  const [unidadesGestoras, setUnidadesGestoras] = React.useState([]);
  const [newUnidadeGestoraData, setNewUnidadeGestoraData] = React.useState({
    orgao_id: '',
    codigo_unidade_orcamentaria: '',
    nome: '',
    nome_abreviado: '',
    cnpj: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    ug_sia: '',
    ug_tce: '',
    tipo: '',
    tipo_de_administracao: '',
    grupo_de_indireta: '',
    situacao_de_registro: '',
    ordenador_primario: '',
    data_nomeacao_op: '',
    ato_portaria_op: '',
    numero_diario_oficial_op: '',
    data_da_publicacao_op: '',
    ordenador_secundario: '',
    data_nomeacao_os: '',
    ato_portaria_os: '',
    numero_diario_oficial_os: '',
    data_da_publicacao_os: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderUnidadeGestoraModal = () => {
    return (
      <CModal
        visible={unidadeGestoraModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setUnidadeGestoraModalVisible(false)}>
          <CModalTitle>Detalhes do unidade gestora</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID DO ÓRGÃO: <strong>{currentUnidadeGestora.orgao_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CÓD. UNIDADE ORÇAMENTÁRIA: <strong>{currentUnidadeGestora.codigo_unidade_orcamentaria}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          NOME: <strong>{currentUnidadeGestora.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          NOME ABREVIADO: <strong>{currentUnidadeGestora.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CNPJ: <strong>{currentUnidadeGestora.cnpj}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CEP: <strong>{currentUnidadeGestora.cep}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          LOGRADOURO: <strong>{currentUnidadeGestora.logradouro}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nº: <strong>{currentUnidadeGestora.numero}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          COMPLEMENTO: <strong>{currentUnidadeGestora.complemento}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          BAIRRO: <strong>{currentUnidadeGestora.bairro}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          UG SIA: <strong>{currentUnidadeGestora.ug_sia}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          UG TCE: <strong>{currentUnidadeGestora.ug_tce}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          TIPO: <strong>{currentUnidadeGestora.tipo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          TIPO DE ADMINISTRAÇÃO: <strong>{currentUnidadeGestora.tipo_de_administracao}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          GRUPO DE INDIRETA: <strong>{currentUnidadeGestora.grupo_de_indireta}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          SITUAÇÃO DE REGISTRO: <strong>{currentUnidadeGestora.situacao_de_registro}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ORDENADOR PRIMÁRIO: <strong>{currentUnidadeGestora.ordenador_primario}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          DATA NOMEAÇÃO OP: <strong>{currentUnidadeGestora.data_nomeacao_op}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ATO PORTARIA OP: <strong>{currentUnidadeGestora.ato_portaria_op}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nº DIÁRIO OFICIAL OP: <strong>{currentUnidadeGestora.numero_diario_oficial_op}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          DATA DA PUBLICAÇÃO OP: <strong>{currentUnidadeGestora.data_da_publicacao_op}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ORDENADOR SECUNDÁRIO: <strong>{currentUnidadeGestora.ordenador_secundario}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          DATA NOMEAÇÃO OS: <strong>{currentUnidadeGestora.data_nomeacao_os}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ATO PORTARIA OS: <strong>{currentUnidadeGestora.ato_portaria_os}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nº DIÁRIO OFICIAL OS: <strong>{currentUnidadeGestora.numero_diario_oficial_os}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          DATA DA PUBLICAÇÃO OS: <strong>{currentUnidadeGestora.data_da_publicacao_os}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteUnidadeGestora(currentUnidadeGestora.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setUnidadeGestoraModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddUnidadeGestoraModal = () => {
    return (
      <CModal
        visible={addUnidadeGestoraModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddUnidadeGestoraModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Unidade Gestora</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, orgao_id: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.orgao_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id do órgão"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                codigo_unidade_orcamentaria: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.codigo_unidade_orcamentaria}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código da unidade orçamentária"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                nome: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, nome_abreviado: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                cnpj: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.cnpj}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o cnpj"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                cep: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.cep}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o cep"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, logradouro: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.logradouro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o logradouro"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                numero: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.numero}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nº"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                complemento: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.complemento}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o complemento"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, bairro: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.bairro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o bairro"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                ug_sia: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.ug_sia}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a UG SIA"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                ug_tce: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.ug_tce}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a UG TCE"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, tipo: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.tipo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o tipo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                tipo_de_administracao: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.tipo_de_administracao}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o tipo de administração"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                grupo_de_indireta: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.grupo_de_indireta}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o grupo de indireta"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, situacao_de_registro: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.situacao_de_registro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a situação de registro"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                ordenador_primario: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.ordenador_primario}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ordenador primário"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                data_nomeacao_op: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.data_nomeacao_op}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de nomeação do OP"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, ato_portaria_op: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.ato_portaria_op}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ato portaria OP"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                numero_diario_oficial_op: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.numero_diario_oficial_op}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nº diário oficial OP"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                data_da_publicacao_op: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.data_da_publicacao_op}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da publicação da OP"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, ordenador_secundario: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.ordenador_secundario}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ordenador secundário"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                data_nomeacao_os: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.data_nomeacao_os}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de nomeação do OS"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                ato_portaria_os: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.ato_portaria_os}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ato portaria OS"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({ ...newUnidadeGestoraData, numero_diario_oficial_os: e.target.value })
            }
            defaultValue={newUnidadeGestoraData.numero_diario_oficial_os}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nº diário oficial OS"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                data_da_publicacao_os: e.target.value,
              })
            }
            defaultValue={newUnidadeGestoraData.data_da_publicacao_os}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da publicação OS"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newUnidadeGestoraData.payment_method}
            onChange={(event) => {
              setNewUnidadeGestoraData({
                ...newUnidadeGestoraData,
                payment_method: event.target.value,
              });
            }}
          >
            <MenuItem value="pix">Pix</MenuItem>
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
          </Select> */}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddUnidadeGestoraModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addUnidadeGestora(newUnidadeGestoraData).then((res) =>
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

  const addUnidadeGestora = async (unidadeGestora) => {
    const status = await UnidadesGestorasService.add(unidadeGestora);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Unidade Gestora adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar unidade gestora.',
        severity: 'error',
      });
    return status;
  };

  const deleteUnidadeGestora = async (unidadeGestora_id) => {
    const status = await UnidadesGestorasService.remove(unidadeGestora_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Unidade Gestora excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir unidade gestora.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddUnidadeGestoraModalVisible(false);
    setNewUnidadeGestoraData({
      orgao_id: '',
      codigo_unidade_orcamentaria: '',
      nome: '',
      nome_abreviado: '',
      cnpj: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      ug_sia: '',
      ug_tce: '',
      tipo: '',
      tipo_de_administracao: '',
      grupo_de_indireta: '',
      situacao_de_registro: '',
      ordenador_primario: '',
      data_nomeacao_op: '',
      ato_portaria_op: '',
      numero_diario_oficial_op: '',
      data_da_publicacao_op: '',
      ordenador_secundario: '',
      data_nomeacao_os: '',
      ato_portaria_os: '',
      numero_diario_oficial_os: '',
      data_da_publicacao_os: '',
    });
    atualizarUnidadesGestoras();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'orgao_id', headerName: 'ID DO ÓRGÃO', width: 220 },
    { field: 'codigo_unidade_orcamentaria', headerName: 'CÓD. UNIDADE ORÇAMENTÁRIA', width: 220 },
    { field: 'nome', headerName: 'NOME', width: 220 },
    { field: 'nome_abreviado', headerName: 'NOME ABREVIADO', width: 220 },
    { field: 'cnpj', headerName: 'CNPJ', width: 220 },
    { field: 'cep', headerName: 'CEP', width: 220 },
    { field: 'logradouro', headerName: 'LOGRADOURO', width: 220 },
    { field: 'numero', headerName: 'Nº', width: 220 },
    { field: 'complemento', headerName: 'COMPLEMENTO', width: 220 },
    { field: 'bairro', headerName: 'BAIRRO', width: 220 },
    { field: 'ug_sia', headerName: 'UG SIA', width: 220 },
    { field: 'ug_tce', headerName: 'UG TCE', width: 220 },
    { field: 'tipo', headerName: 'TIPO', width: 220 },
    { field: 'tipo_de_administracao', headerName: 'TIPO DE ADMNISTRAÇÃO', width: 220 },
    { field: 'grupo_de_indireta', headerName: 'GRUPO DE INDIRETA', width: 220 },
    { field: 'situacao_de_registro', headerName: 'SITUAÇÃO DE REGISTRO', width: 220 },
    { field: 'ordenador_primario', headerName: 'ORDENADOR PRIMÁRIO', width: 220 },
    { field: 'data_nomeacao_op', headerName: 'DATA NOMEAÇÃO OP', width: 220 },
    { field: 'ato_portaria_op', headerName: 'ATO PORTARIA OP', width: 220 },
    { field: 'numero_diario_oficial_op', headerName: 'Nº DIÁRIO OFICIAL OP', width: 220 },
    { field: 'data_da_publicacao_op', headerName: 'DATA DA PUBLICAÇÃO OP', width: 220 },
    { field: 'ordenador_secundario', headerName: 'ORDENADOR SECUNDÁRIO', width: 220 },
    { field: 'data_nomeacao_os', headerName: 'DATA NOMEAÇÃO OS', width: 220 },
    { field: 'ato_portaria_os', headerName: 'ATO PORTARIA OS', width: 220 },
    { field: 'numero_diario_oficial_os', headerName: 'Nº DIÁRIO OFICIAL OS', width: 220 },
    { field: 'data_da_publicacao_os', headerName: 'DATA DA PUBLICAÇÃO OS', width: 220 },
  ];

  const deleteSuccess = async () => {
    setUnidadeGestoraModalVisible(false);
    setCurrentUnidadeGestora({
      id: '',
      orgao_id: '',
      codigo_unidade_orcamentaria: '',
      nome: '',
      nome_abreviado: '',
      cnpj: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      ug_sia: '',
      ug_tce: '',
      tipo: '',
      tipo_de_administracao: '',
      grupo_de_indireta: '',
      situacao_de_registro: '',
      ordenador_primario: '',
      data_nomeacao_op: '',
      ato_portaria_op: '',
      numero_diario_oficial_op: '',
      data_da_publicacao_op: '',
      ordenador_secundario: '',
      data_nomeacao_os: '',
      ato_portaria_os: '',
      numero_diario_oficial_os: '',
      data_da_publicacao_os: '',
    });
    atualizarUnidadesGestoras();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentUnidadeGestora(row);
    setUnidadeGestoraModalVisible(true);
  };

  const atualizarUnidadesGestoras = async () => {
    const unidadesGestorasAtualizados = await UnidadesGestorasService.getAll();
    setUnidadesGestoras(unidadesGestorasAtualizados);
  };

  React.useEffect(() => {
    atualizarUnidadesGestoras();
  }, []);

  return (
    <>
      {unidadeGestoraModalVisible && renderUnidadeGestoraModal()}
      {addUnidadeGestoraModalVisible && renderAddUnidadeGestoraModal()}
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
            onClick={() => setAddUnidadeGestoraModalVisible(true)}
          >
            Adicionar Unidade Gestora <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Unidades Gestoras</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={unidadesGestoras}
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

export default UnidadesGestoras;
