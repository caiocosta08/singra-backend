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
import * as ElementosDeDespesaService from '../../../services/elementos_de_despesa.service';
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

const ElementosDeDespesa = () => {
  const [elementoDeDespesaModalVisible, setElementoDeDespesaModalVisible] = React.useState(false);
  const [addElementoDeDespesaModalVisible, setAddElementoDeDespesaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentElementoDeDespesa, setCurrentElementoDeDespesa] = React.useState({});
  const [elementosDeDespesa, setElementosDeDespesa] = React.useState([]);
  const [newElementoDeDespesaData, setNewElementoDeDespesaData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderElementoDeDespesaModal = () => {
    return (
      <CModal
        visible={elementoDeDespesaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setElementoDeDespesaModalVisible(false)}>
          <CModalTitle>Detalhes do elementoDeDespesa</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentElementoDeDespesa.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentElementoDeDespesa.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteElementoDeDespesa(currentElementoDeDespesa.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setElementoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddElementoDeDespesaModal = () => {
    return (
      <CModal
        visible={addElementoDeDespesaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddElementoDeDespesaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Elemento de Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewElementoDeDespesaData({ ...newElementoDeDespesaData, codigo: e.target.value })
            }
            defaultValue={newElementoDeDespesaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewElementoDeDespesaData({
                ...newElementoDeDespesaData,
                nome: e.target.value,
              })
            }
            defaultValue={newElementoDeDespesaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddElementoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addElementoDeDespesa(newElementoDeDespesaData).then((res) =>
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

  const addElementoDeDespesa = async (elementoDeDespesa) => {
    const status = await ElementosDeDespesaService.add(elementoDeDespesa);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Elemento de Despesa adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar elementoDeDespesa.',
        severity: 'error',
      });
    return status;
  };

  const deleteElementoDeDespesa = async (elementoDeDespesa_id) => {
    const status = await ElementosDeDespesaService.remove(elementoDeDespesa_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Elemento de Despesa excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir elementoDeDespesa.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddElementoDeDespesaModalVisible(false);
    setNewElementoDeDespesaData({
      codigo: '',
      nome: '',
    });
    atualizarElementosDeDespesa();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'codigo',
      headerName: 'Código',
      width: 100,
    },
    { field: 'nome', headerName: 'Nome', width: 190 },
    { field: 'cpf', headerName: 'CPF', width: 190 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setElementoDeDespesaModalVisible(false);
    setCurrentElementoDeDespesa({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarElementosDeDespesa();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentElementoDeDespesa(row);
    setElementoDeDespesaModalVisible(true);
  };

  const atualizarElementosDeDespesa = async () => {
    const elementosDeDespesaAtualizados = await ElementosDeDespesaService.getAll();
    setElementosDeDespesa(elementosDeDespesaAtualizados);
  };

  React.useEffect(() => {
    atualizarElementosDeDespesa();
  }, []);

  return (
    <>
      {elementoDeDespesaModalVisible && renderElementoDeDespesaModal()}
      {addElementoDeDespesaModalVisible && renderAddElementoDeDespesaModal()}
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
            onClick={() => setAddElementoDeDespesaModalVisible(true)}
          >
            Adicionar Elemento de Despesa <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Elementos de Despesa</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={elementosDeDespesa}
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

export default ElementosDeDespesa;
