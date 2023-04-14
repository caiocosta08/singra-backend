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
import * as SubelementosDeDespesaService from '../../../services/subelementos_de_despesa.service';
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

const SubelementosDeDespesa = () => {
  const [subelementoDeDespesaModalVisible, setSubelementoDeDespesaModalVisible] = React.useState(false);
  const [addSubelementoDeDespesaModalVisible, setAddSubelementoDeDespesaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentSubelementoDeDespesa, setCurrentSubelementoDeDespesa] = React.useState({});
  const [subelementosDeDespesa, setSubelementosDeDespesa] = React.useState([]);
  const [newSubelementoDeDespesaData, setNewSubelementoDeDespesaData] = React.useState({
    codigo_elemento_de_despesa_id: '',
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderSubelementoDeDespesaModal = () => {
    return (
      <CModal
        visible={subelementoDeDespesaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setSubelementoDeDespesaModalVisible(false)}>
          <CModalTitle>Detalhes do subelemento de despesa</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do elemento de despesa: <strong>{currentSubelementoDeDespesa.codigo_elemento_de_despesa_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentSubelementoDeDespesa.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentSubelementoDeDespesa.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteSubelementoDeDespesa(currentSubelementoDeDespesa.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setSubelementoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddSubelementoDeDespesaModal = () => {
    return (
      <CModal
        visible={addSubelementoDeDespesaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddSubelementoDeDespesaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Subelemento de Despesa</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewSubelementoDeDespesaData({
                ...newSubelementoDeDespesaData,
                codigo_elemento_de_despesa_id: e.target.value,
              })
            }
            defaultValue={newSubelementoDeDespesaData.codigo_elemento_de_despesa_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ID do elemento de despesa"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSubelementoDeDespesaData({ ...newSubelementoDeDespesaData, codigo: e.target.value })
            }
            defaultValue={newSubelementoDeDespesaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSubelementoDeDespesaData({
                ...newSubelementoDeDespesaData,
                nome: e.target.value,
              })
            }
            defaultValue={newSubelementoDeDespesaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddSubelementoDeDespesaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addSubelementoDeDespesa(newSubelementoDeDespesaData).then((res) =>
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

  const addSubelementoDeDespesa = async (subelementoDeDespesa) => {
    const status = await SubelementosDeDespesaService.add(subelementoDeDespesa);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Subelemento de Despesa adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar subelemento de despesa.',
        severity: 'error',
      });
    return status;
  };

  const deleteSubelementoDeDespesa = async (subelementoDeDespesa_id) => {
    const status = await SubelementosDeDespesaService.remove(subelementoDeDespesa_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Subelemento de Despesa excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir subelemento de despesa.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddSubelementoDeDespesaModalVisible(false);
    setNewSubelementoDeDespesaData({
      codigo_elemento_de_despesa_id: '',
      codigo: '',
      nome: '',
    });
    atualizarSubelementosDeDespesa();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo_elemento_de_despesa_id', headerName: 'ID do elemento de despesa', width: 200 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setSubelementoDeDespesaModalVisible(false);
    setCurrentSubelementoDeDespesa({
      id: '',
      codigo_elemento_de_despesa_id: '',
      codigo: '',
      nome: '',
    });
    atualizarSubelementosDeDespesa();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentSubelementoDeDespesa(row);
    setSubelementoDeDespesaModalVisible(true);
  };

  const atualizarSubelementosDeDespesa = async () => {
    const subelementosDeDespesaAtualizados = await SubelementosDeDespesaService.getAll();
    setSubelementosDeDespesa(subelementosDeDespesaAtualizados);
  };

  React.useEffect(() => {
    atualizarSubelementosDeDespesa();
  }, []);

  return (
    <>
      {subelementoDeDespesaModalVisible && renderSubelementoDeDespesaModal()}
      {addSubelementoDeDespesaModalVisible && renderAddSubelementoDeDespesaModal()}
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
            onClick={() => setAddSubelementoDeDespesaModalVisible(true)}
          >
            Adicionar Subelemento de Despesa <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Subelementos de Despesa</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={subelementosDeDespesa}
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

export default SubelementosDeDespesa;
