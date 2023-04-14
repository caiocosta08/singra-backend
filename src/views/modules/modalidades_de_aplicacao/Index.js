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
import * as ModalidadesDeAplicacaoService from '../../../services/modalidades_de_aplicacao.service';
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

const ModalidadesDeAplicacao = () => {
  const [modalidadeDeAplicacaoModalVisible, setModalidadeDeAplicacaoModalVisible] = React.useState(false);
  const [addModalidadeDeAplicacaoModalVisible, setAddModalidadeDeAplicacaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentModalidadeDeAplicacao, setCurrentModalidadeDeAplicacao] = React.useState({});
  const [modalidadesDeAplicacao, setModalidadesDeAplicacao] = React.useState([]);
  const [newModalidadeDeAplicacaoData, setNewModalidadeDeAplicacaoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderModalidadeDeAplicacaoModal = () => {
    return (
      <CModal
        visible={modalidadeDeAplicacaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setModalidadeDeAplicacaoModalVisible(false)}>
          <CModalTitle>Detalhes do modalidade de aplicação</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentModalidadeDeAplicacao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentModalidadeDeAplicacao.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteModalidadeDeAplicacao(currentModalidadeDeAplicacao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setModalidadeDeAplicacaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddModalidadeDeAplicacaoModal = () => {
    return (
      <CModal
        visible={addModalidadeDeAplicacaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddModalidadeDeAplicacaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Modalidade de Aplicação</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewModalidadeDeAplicacaoData({ ...newModalidadeDeAplicacaoData, codigo: e.target.value })
            }
            defaultValue={newModalidadeDeAplicacaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewModalidadeDeAplicacaoData({
                ...newModalidadeDeAplicacaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newModalidadeDeAplicacaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddModalidadeDeAplicacaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addModalidadeDeAplicacao(newModalidadeDeAplicacaoData).then((res) =>
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

  const addModalidadeDeAplicacao = async (modalidadeDeAplicacao) => {
    const status = await ModalidadesDeAplicacaoService.add(modalidadeDeAplicacao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Modalidade de Aplicação adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar modalidade de aplicação.',
        severity: 'error',
      });
    return status;
  };

  const deleteModalidadeDeAplicacao = async (modalidadeDeAplicacao_id) => {
    const status = await ModalidadesDeAplicacaoService.remove(modalidadeDeAplicacao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Modalidade de Aplicação excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir modalidade de aplicação.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddModalidadeDeAplicacaoModalVisible(false);
    setNewModalidadeDeAplicacaoData({
      codigo: '',
      nome: '',
    });
    atualizarModalidadesDeAplicacao();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nome', headerName: 'Nome', width: 190 },
    { field: 'codigo', headerName: 'Código', width: 190 },
  ];

  const deleteSuccess = async () => {
    setModalidadeDeAplicacaoModalVisible(false);
    setCurrentModalidadeDeAplicacao({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarModalidadesDeAplicacao();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentModalidadeDeAplicacao(row);
    setModalidadeDeAplicacaoModalVisible(true);
  };

  const atualizarModalidadesDeAplicacao = async () => {
    const modalidadesDeAplicacaoAtualizados = await ModalidadesDeAplicacaoService.getAll();
    setModalidadesDeAplicacao(modalidadesDeAplicacaoAtualizados);
  };

  React.useEffect(() => {
    atualizarModalidadesDeAplicacao();
  }, []);

  return (
    <>
      {modalidadeDeAplicacaoModalVisible && renderModalidadeDeAplicacaoModal()}
      {addModalidadeDeAplicacaoModalVisible && renderAddModalidadeDeAplicacaoModal()}
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
            onClick={() => setAddModalidadeDeAplicacaoModalVisible(true)}
          >
            Adicionar Modalidade de Aplicação <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Modalidades de Aplicação</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={modalidadesDeAplicacao}
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

export default ModalidadesDeAplicacao;
