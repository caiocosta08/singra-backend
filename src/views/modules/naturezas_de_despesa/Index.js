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
import * as NaturezasDeDespesaService from '../../../services/naturezas_de_despesa.service';
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

const NaturezasDeDespesa = () => {
  const [naturezaDeDespesaModalVisible, setNaturezaDeDespesaModalVisible] = React.useState(false);
  const [addNaturezaDeDespesaModalVisible, setAddNaturezaDeDespesaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentNaturezaDeDespesa, setCurrentNaturezaDeDespesa] = React.useState({});
  const [naturezasDeDespesa, setNaturezasDeDespesa] = React.useState([]);
  const [newNaturezaDeDespesaData, setNewNaturezaDeDespesaData] = React.useState({
    codigo: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderNaturezaDeDespesaModal = () => {
    return (
      <CModal
        visible={naturezaDeDespesaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setNaturezaDeDespesaModalVisible(false)}>
          <CModalTitle>Detalhes do natureza de despesa</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentNaturezaDeDespesa.codigo}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteNaturezaDeDespesa(currentNaturezaDeDespesa.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setNaturezaDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddNaturezaDeDespesaModal = () => {
    return (
      <CModal
        visible={addNaturezaDeDespesaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddNaturezaDeDespesaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Natureza de Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewNaturezaDeDespesaData({ ...newNaturezaDeDespesaData, codigo: e.target.value })
            }
            defaultValue={newNaturezaDeDespesaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddNaturezaDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addNaturezaDeDespesa(newNaturezaDeDespesaData).then((res) =>
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

  const addNaturezaDeDespesa = async (naturezaDeDespesa) => {
    const status = await NaturezasDeDespesaService.add(naturezaDeDespesa);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Natureza de Despesa adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar natureza de despesa.',
        severity: 'error',
      });
    return status;
  };

  const deleteNaturezaDeDespesa = async (naturezaDeDespesa_id) => {
    const status = await NaturezasDeDespesaService.remove(naturezaDeDespesa_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Natureza de Despesa excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir natureza de despesa.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddNaturezaDeDespesaModalVisible(false);
    setNewNaturezaDeDespesaData({
      codigo: '',
    });
    atualizarNaturezasDeDespesa();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 300 },
  ];

  const deleteSuccess = async () => {
    setNaturezaDeDespesaModalVisible(false);
    setCurrentNaturezaDeDespesa({
      id: '',
      codigo: '',
    });
    atualizarNaturezasDeDespesa();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentNaturezaDeDespesa(row);
    setNaturezaDeDespesaModalVisible(true);
  };

  const atualizarNaturezasDeDespesa = async () => {
    const naturezasDeDespesaAtualizados = await NaturezasDeDespesaService.getAll();
    setNaturezasDeDespesa(naturezasDeDespesaAtualizados);
  };

  React.useEffect(() => {
    atualizarNaturezasDeDespesa();
  }, []);

  return (
    <>
      {naturezaDeDespesaModalVisible && renderNaturezaDeDespesaModal()}
      {addNaturezaDeDespesaModalVisible && renderAddNaturezaDeDespesaModal()}
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
            onClick={() => setAddNaturezaDeDespesaModalVisible(true)}
          >
            Adicionar Natureza de Despesa <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Naturezas de Despesa</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={naturezasDeDespesa}
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

export default NaturezasDeDespesa;
