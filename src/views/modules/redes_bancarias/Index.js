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
import * as RedesBancariasService from '../../../services/redes_bancarias.service';
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


const RedesBancarias = () => {
  const [redeBancariaModalVisible, setRedeBancariaModalVisible] = React.useState(false);
  const [addRedeBancariaModalVisible, setAddRedeBancariaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentRedeBancaria, setCurrentRedeBancaria] = React.useState({});
  const [redesBancarias, setRedesBancarias] = React.useState([]);
  const [newRedeBancariaData, setNewRedeBancariaData] = React.useState({
    codigo: '',
    nome: '',
    nome_abreviado: '',
    situacao_de_registro: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderRedeBancariaModal = () => {
    return (
      <CModal
        visible={redeBancariaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setRedeBancariaModalVisible(false)}>
          <CModalTitle>Detalhes do rede namc</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentRedeBancaria.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentRedeBancaria.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentRedeBancaria.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Situação de registro: <strong>{currentRedeBancaria.situacao_de_registro}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteRedeBancaria(currentRedeBancaria.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setRedeBancariaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddRedeBancariaModal = () => {
    return (
      <CModal
        visible={addRedeBancariaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddRedeBancariaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Rede Bancária</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewRedeBancariaData({ ...newRedeBancariaData, codigo: e.target.value })
            }
            defaultValue={newRedeBancariaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewRedeBancariaData({
                ...newRedeBancariaData,
                nome: e.target.value,
              })
            }
            defaultValue={newRedeBancariaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewRedeBancariaData({
                ...newRedeBancariaData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newRedeBancariaData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewRedeBancariaData({
                ...newRedeBancariaData,
                situacao_de_registro: e.target.value,
              })
            }
            defaultValue={newRedeBancariaData.situacao_de_registro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a situação de registro"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddRedeBancariaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addRedeBancaria(newRedeBancariaData).then((res) =>
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

  const addRedeBancaria = async (redeBancaria) => {
    const status = await RedesBancariasService.add(redeBancaria);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Rede Bancária adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar rede bancária.',
        severity: 'error',
      });
    return status;
  };

  const deleteRedeBancaria = async (redeBancaria_id) => {
    const status = await RedesBancariasService.remove(redeBancaria_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Rede Bancária excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir rede bancária.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddRedeBancariaModalVisible(false);
    setNewRedeBancariaData({
      codigo: '',
      nome: '',
      nome_abreviado: '',
      situacao_de_registro: '',
    });
    atualizarRedesBancarias();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nome_abreviado', headerName: 'Nome abreviado', width: 200 },
    { field: 'situacao_de_registro', headerName: 'Situação de registro', width: 200 },
  ];

  const deleteSuccess = async () => {
    setRedeBancariaModalVisible(false);
    setCurrentRedeBancaria({
      id: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      situacao_de_registro: '',
    });
    atualizarRedesBancarias();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentRedeBancaria(row);
    setRedeBancariaModalVisible(true);
  };

  const atualizarRedesBancarias = async () => {
    const redesBancariasAtualizados = await RedesBancariasService.getAll();
    setRedesBancarias(redesBancariasAtualizados);
  };

  React.useEffect(() => {
    atualizarRedesBancarias();
  }, []);

  return (
    <>
      {redeBancariaModalVisible && renderRedeBancariaModal()}
      {addRedeBancariaModalVisible && renderAddRedeBancariaModal()}
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
            onClick={() => setAddRedeBancariaModalVisible(true)}
          >
            Adicionar Rede Bancária <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Redes Bancárias</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={redesBancarias}
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

export default RedesBancarias;
