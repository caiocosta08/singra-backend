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
import * as SetoresAdministrativosService from '../../../services/setores_administrativos.service';
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

const SetoresAdministrativos = () => {
  const [setorAdministrativoModalVisible, setSetorAdministrativoModalVisible] = React.useState(false);
  const [addSetorAdministrativoModalVisible, setAddSetorAdministrativoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentSetorAdministrativo, setCurrentSetorAdministrativo] = React.useState({});
  const [setoresAdministrativos, setSetoresAdministrativos] = React.useState([]);
  const [newSetorAdministrativoData, setNewSetorAdministrativoData] = React.useState({
    codigo: '',
    nome: '',
    nome_abreviado: '',
    orgao_id: '',
    unidade_gestora_id: '',
    setor_administrativo_id: '',
    situacao_de_registro: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderSetorAdministrativoModal = () => {
    return (
      <CModal
        visible={setorAdministrativoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setSetorAdministrativoModalVisible(false)}>
          <CModalTitle>Detalhes do setor administrativo</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentSetorAdministrativo.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentSetorAdministrativo.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentSetorAdministrativo.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do órgão: <strong>{currentSetorAdministrativo.orgao_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID da unidade gestora: <strong>{currentSetorAdministrativo.unidade_gestora_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do setor administrativo: <strong>{currentSetorAdministrativo.setor_administrativo_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Situação de registro: <strong>{currentSetorAdministrativo.situacao_de_registro}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteSetorAdministrativo(currentSetorAdministrativo.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setSetorAdministrativoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddSetorAdministrativoModal = () => {
    return (
      <CModal
        visible={addSetorAdministrativoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddSetorAdministrativoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Setor Administrativo</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({ ...newSetorAdministrativoData, codigo: e.target.value })
            }
            defaultValue={newSetorAdministrativoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                nome: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                orgao_id: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.orgao_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id do órgão"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                unidade_gestora_id: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.unidade_gestora_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id da unidade gestora"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                setor_administrativo_id: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.setor_administrativo_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id do setor administrativo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
                situacao_de_registro: e.target.value,
              })
            }
            defaultValue={newSetorAdministrativoData.situacao_de_registro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a situação de registro"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newSetorAdministrativoData.payment_method}
            onChange={(event) => {
              setNewSetorAdministrativoData({
                ...newSetorAdministrativoData,
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
            onClick={() => setAddSetorAdministrativoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addSetorAdministrativo(newSetorAdministrativoData).then((res) =>
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

  const addSetorAdministrativo = async (setorAdministrativo) => {
    const status = await SetoresAdministrativosService.add(setorAdministrativo);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Setor Administrativo adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar setor administrativo.',
        severity: 'error',
      });
    return status;
  };

  const deleteSetorAdministrativo = async (setorAdministrativo_id) => {
    const status = await SetoresAdministrativosService.remove(setorAdministrativo_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Setor Administrativo excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir setor administrativo.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddSetorAdministrativoModalVisible(false);
    setNewSetorAdministrativoData({
      codigo: '',
      nome: '',
      nome_abreviado: '',
      orgao_id: '',
      unidade_gestora_id: '',
      setor_administrativo_id: '',
      situacao_de_registro: '',
    });
    atualizarSetoresAdministrativos();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nome_abreviado', headerName: 'Nome abreviado', width: 200 },
    { field: 'orgao_id', headerName: 'ID do órgão', width: 200 },
    { field: 'unidade_gestora_id', headerName: 'ID da unidade gestora', width: 200 },
    { field: 'setor_administrativo_id', headerName: 'ID do setor administrativo', width: 200 },
    { field: 'situacao_de_registro', headerName: 'Situação de registro', width: 200 },
  ];

  const deleteSuccess = async () => {
    setSetorAdministrativoModalVisible(false);
    setCurrentSetorAdministrativo({
      id: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      orgao_id: '',
      unidade_gestora_id: '',
      setor_administrativo_id: '',
      situacao_de_registro: '',
    });
    atualizarSetoresAdministrativos();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentSetorAdministrativo(row);
    setSetorAdministrativoModalVisible(true);
  };

  const atualizarSetoresAdministrativos = async () => {
    const setoresAdministrativosAtualizados = await SetoresAdministrativosService.getAll();
    setSetoresAdministrativos(setoresAdministrativosAtualizados);
  };

  React.useEffect(() => {
    atualizarSetoresAdministrativos();
  }, []);

  return (
    <>
      {setorAdministrativoModalVisible && renderSetorAdministrativoModal()}
      {addSetorAdministrativoModalVisible && renderAddSetorAdministrativoModal()}
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
            onClick={() => setAddSetorAdministrativoModalVisible(true)}
          >
            Adicionar Setor Administrativo <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Setores Administrativos</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={setoresAdministrativos}
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

export default SetoresAdministrativos;
