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
import * as SubfuncoesService from '../../../services/subfuncoes.service';
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

const Subfuncoes = () => {
  const [subfuncaoModalVisible, setSubfuncaoModalVisible] = React.useState(false);
  const [addSubfuncaoModalVisible, setAddSubfuncaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentSubfuncao, setCurrentSubfuncao] = React.useState({});
  const [subfuncoes, setSubfuncoes] = React.useState([]);
  const [newSubfuncaoData, setNewSubfuncaoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderSubfuncaoModal = () => {
    return (
      <CModal
        visible={subfuncaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setSubfuncaoModalVisible(false)}>
          <CModalTitle>Detalhes do subfunção</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentSubfuncao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentSubfuncao.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteSubfuncao(currentSubfuncao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setSubfuncaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddSubfuncaoModal = () => {
    return (
      <CModal
        visible={addSubfuncaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddSubfuncaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Subfunção</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewSubfuncaoData({ ...newSubfuncaoData, codigo: e.target.value })
            }
            defaultValue={newSubfuncaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSubfuncaoData({
                ...newSubfuncaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newSubfuncaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddSubfuncaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addSubfuncao(newSubfuncaoData).then((res) =>
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

  const addSubfuncao = async (subfuncao) => {
    const status = await SubfuncoesService.add(subfuncao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Subfunção adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar subfunção.',
        severity: 'error',
      });
    return status;
  };

  const deleteSubfuncao = async (subfuncao_id) => {
    const status = await SubfuncoesService.remove(subfuncao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Subfunção excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir subfunção.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddSubfuncaoModalVisible(false);
    setNewSubfuncaoData({
      codigo: '',
      nome: '',
    });
    atualizarSubfuncoes();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setSubfuncaoModalVisible(false);
    setCurrentSubfuncao({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarSubfuncoes();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentSubfuncao(row);
    setSubfuncaoModalVisible(true);
  };

  const atualizarSubfuncoes = async () => {
    const subfuncoesAtualizados = await SubfuncoesService.getAll();
    setSubfuncoes(subfuncoesAtualizados);
  };

  React.useEffect(() => {
    atualizarSubfuncoes();
  }, []);

  return (
    <>
      {subfuncaoModalVisible && renderSubfuncaoModal()}
      {addSubfuncaoModalVisible && renderAddSubfuncaoModal()}
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
            onClick={() => setAddSubfuncaoModalVisible(true)}
          >
            Adicionar Subfunção <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Subfunções</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={subfuncoes}
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

export default Subfuncoes;
