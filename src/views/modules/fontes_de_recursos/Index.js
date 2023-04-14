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
import * as FontesDeRecursosService from '../../../services/fontes_de_recursos.service';
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

const FontesDeRecursos = () => {
  const [fonteDeRecursoModalVisible, setFonteDeRecursoModalVisible] = React.useState(false);
  const [addFonteDeRecursoModalVisible, setAddFonteDeRecursoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentFonteDeRecurso, setCurrentFonteDeRecurso] = React.useState({});
  const [fontesDeRecursos, setFontesDeRecursos] = React.useState([]);
  const [newFonteDeRecursoData, setNewFonteDeRecursoData] = React.useState({
    codigo: '',
    nome: '',
    nome_abreviado: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderFonteDeRecursoModal = () => {
    return (
      <CModal
        visible={fonteDeRecursoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setFonteDeRecursoModalVisible(false)}>
          <CModalTitle>Detalhes do fonte de recurso</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentFonteDeRecurso.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentFonteDeRecurso.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentFonteDeRecurso.nome_abreviado}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteFonteDeRecurso(currentFonteDeRecurso.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setFonteDeRecursoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddFonteDeRecursoModal = () => {
    return (
      <CModal
        visible={addFonteDeRecursoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddFonteDeRecursoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Fonte de Recurso</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewFonteDeRecursoData({ ...newFonteDeRecursoData, codigo: e.target.value })
            }
            defaultValue={newFonteDeRecursoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewFonteDeRecursoData({
                ...newFonteDeRecursoData,
                nome: e.target.value,
              })
            }
            defaultValue={newFonteDeRecursoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewFonteDeRecursoData({
                ...newFonteDeRecursoData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newFonteDeRecursoData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddFonteDeRecursoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addFonteDeRecurso(newFonteDeRecursoData).then((res) =>
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

  const addFonteDeRecurso = async (fonteDeRecurso) => {
    const status = await FontesDeRecursosService.add(fonteDeRecurso);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Fonte de Recurso adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar fonte de recurso.',
        severity: 'error',
      });
    return status;
  };

  const deleteFonteDeRecurso = async (fonteDeRecurso_id) => {
    const status = await FontesDeRecursosService.remove(fonteDeRecurso_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Fonte de Recurso excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir fonte de recurso.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddFonteDeRecursoModalVisible(false);
    setNewFonteDeRecursoData({
      codigo: '',
      nome: '',
      nome_abreviado: '',
    });
    atualizarFontesDeRecursos();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 220 },
    { field: 'nome', headerName: 'Nome', width: 220 },
    { field: 'nome_abreviado', headerName: 'Nome abreviado', width: 220 },
  ];

  const deleteSuccess = async () => {
    setFonteDeRecursoModalVisible(false);
    setCurrentFonteDeRecurso({
      id: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
    });
    atualizarFontesDeRecursos();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentFonteDeRecurso(row);
    setFonteDeRecursoModalVisible(true);
  };

  const atualizarFontesDeRecursos = async () => {
    const fontesDeRecursosAtualizados = await FontesDeRecursosService.getAll();
    setFontesDeRecursos(fontesDeRecursosAtualizados);
  };

  React.useEffect(() => {
    atualizarFontesDeRecursos();
  }, []);

  return (
    <>
      {fonteDeRecursoModalVisible && renderFonteDeRecursoModal()}
      {addFonteDeRecursoModalVisible && renderAddFonteDeRecursoModal()}
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
            onClick={() => setAddFonteDeRecursoModalVisible(true)}
          >
            Adicionar Fonte de Recurso <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Fontes de Recursos</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={fontesDeRecursos}
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

export default FontesDeRecursos;
