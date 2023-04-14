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
import * as SubacoesService from '../../../services/subacoes.service';
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

const Subacoes = () => {
  const [subacaoModalVisible, setSubacaoModalVisible] = React.useState(false);
  const [addSubacaoModalVisible, setAddSubacaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentSubacao, setCurrentSubacao] = React.useState({});
  const [subacoes, setSubacoes] = React.useState([]);
  const [newSubacaoData, setNewSubacaoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderSubacaoModal = () => {
    return (
      <CModal
        visible={subacaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setSubacaoModalVisible(false)}>
          <CModalTitle>Detalhes da subação</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentSubacao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentSubacao.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteSubacao(currentSubacao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setSubacaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddSubacaoModal = () => {
    return (
      <CModal
        visible={addSubacaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddSubacaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Subação</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewSubacaoData({ ...newSubacaoData, codigo: e.target.value })
            }
            defaultValue={newSubacaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewSubacaoData({
                ...newSubacaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newSubacaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddSubacaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addSubacao(newSubacaoData).then((res) =>
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

  const addSubacao = async (subacao) => {
    const status = await SubacoesService.add(subacao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Subação adicionada com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar subação.',
        severity: 'error',
      });
    return status;
  };

  const deleteSubacao = async (subacao_id) => {
    const status = await SubacoesService.remove(subacao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Subação excluída com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir subação.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddSubacaoModalVisible(false);
    setNewSubacaoData({
      codigo: '',
      nome: '',
    });
    atualizarSubacoes();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setSubacaoModalVisible(false);
    setCurrentSubacao({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarSubacoes();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentSubacao(row);
    setSubacaoModalVisible(true);
  };

  const atualizarSubacoes = async () => {
    const subacoesAtualizados = await SubacoesService.getAll();
    setSubacoes(subacoesAtualizados);
  };

  React.useEffect(() => {
    atualizarSubacoes();
  }, []);

  return (
    <>
      {subacaoModalVisible && renderSubacaoModal()}
      {addSubacaoModalVisible && renderAddSubacaoModal()}
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
            onClick={() => setAddSubacaoModalVisible(true)}
          >
            Adicionar Subação <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Subações</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={subacoes}
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

export default Subacoes;
