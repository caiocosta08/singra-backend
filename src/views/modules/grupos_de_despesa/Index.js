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
import * as GruposDeDespesaService from '../../../services/grupos_de_despesa.service';
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

const GruposDeDespesa = () => {
  const [grupoDeDespesaModalVisible, setGrupoDeDespesaModalVisible] = React.useState(false);
  const [addGrupoDeDespesaModalVisible, setAddGrupoDeDespesaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentGrupoDeDespesa, setCurrentGrupoDeDespesa] = React.useState({});
  const [gruposDeDespesa, setGruposDeDespesa] = React.useState([]);
  const [newGrupoDeDespesaData, setNewGrupoDeDespesaData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderGrupoDeDespesaModal = () => {
    return (
      <CModal
        visible={grupoDeDespesaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setGrupoDeDespesaModalVisible(false)}>
          <CModalTitle>Detalhes do grupo de despesa</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentGrupoDeDespesa.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentGrupoDeDespesa.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteGrupoDeDespesa(currentGrupoDeDespesa.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setGrupoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddGrupoDeDespesaModal = () => {
    return (
      <CModal
        visible={addGrupoDeDespesaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddGrupoDeDespesaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Grupo de Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewGrupoDeDespesaData({ ...newGrupoDeDespesaData, codigo: e.target.value })
            }
            defaultValue={newGrupoDeDespesaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewGrupoDeDespesaData({
                ...newGrupoDeDespesaData,
                nome: e.target.value,
              })
            }
            defaultValue={newGrupoDeDespesaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddGrupoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addGrupoDeDespesa(newGrupoDeDespesaData).then((res) =>
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

  const addGrupoDeDespesa = async (grupoDeDespesa) => {
    const status = await GruposDeDespesaService.add(grupoDeDespesa);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Grupo de Despesa adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar grupo de despesa.',
        severity: 'error',
      });
    return status;
  };

  const deleteGrupoDeDespesa = async (grupoDeDespesa_id) => {
    const status = await GruposDeDespesaService.remove(grupoDeDespesa_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Grupo de Despesa excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir grupo de despesa.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddGrupoDeDespesaModalVisible(false);
    setNewGrupoDeDespesaData({
      codigo: '',
      nome: '',
    });
    atualizarGruposDeDespesa();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 250 },
    { field: 'nome', headerName: 'Nome', width: 250 },
  ];

  const deleteSuccess = async () => {
    setGrupoDeDespesaModalVisible(false);
    setCurrentGrupoDeDespesa({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarGruposDeDespesa();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentGrupoDeDespesa(row);
    setGrupoDeDespesaModalVisible(true);
  };

  const atualizarGruposDeDespesa = async () => {
    const gruposDeDespesaAtualizados = await GruposDeDespesaService.getAll();
    setGruposDeDespesa(gruposDeDespesaAtualizados);
  };

  React.useEffect(() => {
    atualizarGruposDeDespesa();
  }, []);

  return (
    <>
      {grupoDeDespesaModalVisible && renderGrupoDeDespesaModal()}
      {addGrupoDeDespesaModalVisible && renderAddGrupoDeDespesaModal()}
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
            onClick={() => setAddGrupoDeDespesaModalVisible(true)}
          >
            Adicionar Grupo de Despesa <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Grupos de Despesa</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={gruposDeDespesa}
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

export default GruposDeDespesa;
