import React from 'react';
import PropTypes from 'prop-types';

import { renderToString } from 'react-dom/server';
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
import * as ContratosService from '../../../services/contratos.service';
import { DataGrid } from '@mui/x-data-grid';
import {
  Alert,
  TextField,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
} from '@mui/material';

import { Button } from '@coreui/coreui';
import {
  Add,
  Money,
  List,
  DeliveryDining,
  RoomService,
  SoupKitchen,
  AttachMoney,
  FoodBank,
} from '@mui/icons-material';




const BasicCard = (props) => {
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: props.color }}
      style={{ margin: 10, width: 200, height: 200, color: '#fff' }}
    >
      <CardContent onClick={props.onClick}>
        <Typography variant="h5" component="div">
          {props.contrato.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.contrato.description !== ''
            ? 'OBS: ' + props.contrato.description
            : ''}{' '}
          <div>
            <AttachMoney /> {props.payment_status}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

BasicCard.propTypes = {
  onClick: PropTypes.func,
  contrato: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Contratos = () => {
  const [contratoModalVisible, setContratoModalVisible] = React.useState(false);
  const [addContratoModalVisible, setAddContratoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentContrato, setCurrentContrato] = React.useState({});
  const [contratos, setContratos] = React.useState([]);
  const [newContratoData, setNewContratoData] = React.useState({
    codigo: '',
    numero_contrato: '',
    numero_cge: '',
    nome_contratante: '',
    numero_processo_licitatorio: '',
    objeto_do_contrato: '',
    nome_contratado: '',
    cpf_cnpj_contratado: '',
    data_celebracao_do_contrato: '',
    data_publicacao: '',
    data_inicio_da_vigencia: '',
    data_termino_da_vigencia: '',
    valor_original: '',
    municipio_id: '',
    outros_municipios: '',
    gestor_do_contrato: '',
    numero_portaria_do_gestor_de_contrato: '',
    data_publicacao_da_portaria: '',
    url_do_contrato: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderContratoModal = () => {
    return (
      <CModal
        visible={contratoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setContratoModalVisible(false)}>
          <CModalTitle>Detalhes do contrato</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentContrato.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Número do contrato: <strong>{currentContrato.numero_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Número CGE: <strong>{currentContrato.numero_cge}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome do contratante: <strong>{currentContrato.nome_contratante}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Número do processo licitatório: <strong>{currentContrato.numero_processo_licitatorio}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Objeto do contrato: <strong>{currentContrato.objeto_do_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome do contratado: <strong>{currentContrato.nome_contratado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CPF/CNPJ do contratado: <strong>{currentContrato.cpf_cnpj_contratado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data de celebração do contrato: <strong>{currentContrato.data_celebracao_do_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data da publicação: <strong>{currentContrato.data_publicacao}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data de início da vigência: <strong>{currentContrato.data_inicio_da_vigencia}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data de término da vigência: <strong>{currentContrato.data_termino_da_vigencia}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Valor original: <strong>{currentContrato.valor_original}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do município: <strong>{currentContrato.municipio_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Outros municípios: <strong>{currentContrato.outros_municipios}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Gestor do contrato: <strong>{currentContrato.gestor_do_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Número da portaria do gestor do contrato: <strong>{currentContrato.numero_portaria_do_gestor_de_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data da publicação da portaria: <strong>{currentContrato.data_publicacao_da_portaria}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          URL do contrato: <strong>{currentContrato.url_do_contrato}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteContrato(currentContrato.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setContratoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddContratoModal = () => {
    return (
      <CModal
        visible={addContratoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddContratoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Contrato</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, codigo: e.target.value })
            }
            defaultValue={newContratoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                numero_contrato: e.target.value,
              })
            }
            defaultValue={newContratoData.numero_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o número do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                numero_cge: e.target.value,
              })
            }
            defaultValue={newContratoData.numero_cge}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o número CGE"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, nome_contratante: e.target.value })
            }
            defaultValue={newContratoData.nome_contratante}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome do contratante"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                numero_processo_licitatorio: e.target.value,
              })
            }
            defaultValue={newContratoData.numero_processo_licitatorio}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o número do processo licitatório"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                objeto_do_contrato: e.target.value,
              })
            }
            defaultValue={newContratoData.objeto_do_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o objeto do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, nome_contratado: e.target.value })
            }
            defaultValue={newContratoData.nome_contratado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome do contratado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                cpf_cnpj_contratado: e.target.value,
              })
            }
            defaultValue={newContratoData.cpf_cnpj_contratado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o cpf/cnpj do contratado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                data_celebracao_do_contrato: e.target.value,
              })
            }
            defaultValue={newContratoData.data_celebracao_do_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de celebração do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, data_publicacao: e.target.value })
            }
            defaultValue={newContratoData.data_publicacao}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da publicação"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                data_inicio_da_vigencia: e.target.value,
              })
            }
            defaultValue={newContratoData.data_inicio_da_vigencia}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de início da vigência"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                data_termino_da_vigencia: e.target.value,
              })
            }
            defaultValue={newContratoData.data_termino_da_vigencia}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de término da vigência"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, valor_original: e.target.value })
            }
            defaultValue={newContratoData.valor_original}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o valor original"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                municipio_id: e.target.value,
              })
            }
            defaultValue={newContratoData.municipio_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ID do município"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                outros_municipios: e.target.value,
              })
            }
            defaultValue={newContratoData.outros_municipios}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite os outros municípios"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({ ...newContratoData, gestor_do_contrato: e.target.value })
            }
            defaultValue={newContratoData.gestor_do_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o gestor do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                numero_portaria_do_gestor_de_contrato: e.target.value,
              })
            }
            defaultValue={newContratoData.numero_portaria_do_gestor_de_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o número da portaria do gestor do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                data_publicacao_da_portaria: e.target.value,
              })
            }
            defaultValue={newContratoData.data_publicacao_da_portaria}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data de publicação da portaria"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewContratoData({
                ...newContratoData,
                url_do_contrato: e.target.value,
              })
            }
            defaultValue={newContratoData.url_do_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a URL do contrato"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddContratoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addContrato(newContratoData).then((res) =>
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

  const addContrato = async (contrato) => {
    const status = await ContratosService.add(contrato);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Contrato adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar contrato.',
        severity: 'error',
      });
    return status;
  };

  const deleteContrato = async (contrato_id) => {
    const status = await ContratosService.remove(contrato_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Contrato excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir contrato.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddContratoModalVisible(false);
    setNewContratoData({
      codigo: '',
      numero_contrato: '',
      numero_cge: '',
      nome_contratante: '',
      numero_processo_licitatorio: '',
      objeto_do_contrato: '',
      nome_contratado: '',
      cpf_cnpj_contratado: '',
      data_celebracao_do_contrato: '',
      data_publicacao: '',
      data_inicio_da_vigencia: '',
      data_termino_da_vigencia: '',
      valor_original: '',
      municipio_id: '',
      outros_municipios: '',
      gestor_do_contrato: '',
      numero_portaria_do_gestor_de_contrato: '',
      data_publicacao_da_portaria: '',
      url_do_contrato: '',
    });
    atualizarContratos();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'numero_contrato', headerName: 'Número do contrato', width: 200 },
    { field: 'numero_cge', headerName: 'Número CGE', width: 200 },
    { field: 'nome_contratante', headerName: 'Nome do contratante', width: 200 },
    { field: 'numero_processo_licitatorio', headerName: 'Número do processo licitatório', width: 200 },
    { field: 'objeto_do_contrato', headerName: 'Objeto do contrato', width: 200 },
    { field: 'nome_contratado', headerName: 'Nome do contratado', width: 200 },
    { field: 'cpf_cnpj_contratado', headerName: 'CPF/CNPJ do contratado', width: 200 },
    { field: 'data_celebracao_do_contrato', headerName: 'Data da celebração do contrato', width: 200 },
    { field: 'data_publicacao', headerName: 'Data da publicação', width: 200 },
    { field: 'data_inicio_da_vigencia', headerName: 'Data de início da vigência', width: 200 },
    { field: 'data_termino_da_vigencia', headerName: 'Data de término da vigência', width: 200 },
    { field: 'valor_original', headerName: 'Valor original', width: 200 },
    { field: 'municipio_id', headerName: 'ID do município', width: 200 },
    { field: 'outros_municipios', headerName: 'Outros municípios', width: 200 },
    { field: 'gestor_do_contrato', headerName: 'Gestor do contrato', width: 200 },
    { field: 'numero_portaria_do_gestor_de_contrato', headerName: 'Número da portaria do gestor do contrato', width: 200 },
    { field: 'data_publicacao_da_portaria', headerName: 'Data da publicação da portaria', width: 200 },
    { field: 'url_do_contrato', headerName: 'URL do contrato', width: 200 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setContratoModalVisible(false);
    setCurrentContrato({
      id: '',
      codigo: '',
      numero_contrato: '',
      numero_cge: '',
      nome_contratante: '',
      numero_processo_licitatorio: '',
      objeto_do_contrato: '',
      nome_contratado: '',
      cpf_cnpj_contratado: '',
      data_celebracao_do_contrato: '',
      data_publicacao: '',
      data_inicio_da_vigencia: '',
      data_termino_da_vigencia: '',
      valor_original: '',
      municipio_id: '',
      outros_municipios: '',
      gestor_do_contrato: '',
      numero_portaria_do_gestor_de_contrato: '',
      data_publicacao_da_portaria: '',
      url_do_contrato: '',
    });
    atualizarContratos();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentContrato(row);
    setContratoModalVisible(true);
  };

  const atualizarContratos = async () => {
    const contratosAtualizados = await ContratosService.getAll();
    setContratos(contratosAtualizados);
  };

  React.useEffect(() => {
    atualizarContratos();
  }, []);

  return (
    <>
      {contratoModalVisible && renderContratoModal()}
      {addContratoModalVisible && renderAddContratoModal()}
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
            onClick={() => setAddContratoModalVisible(true)}
          >
            Adicionar Contrato <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Contratos</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={contratos}
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

export default Contratos;
