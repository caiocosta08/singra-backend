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
import * as RegionaisDeEstadoService from '../../../services/regionais_de_estado.service';
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

const RegionaisDeEstado = () => {
  const [regionalDeEstadoModalVisible, setRegionalDeEstadoModalVisible] = React.useState(false);
  const [addRegionalDeEstadoModalVisible, setAddRegionalDeEstadoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentRegionalDeEstado, setCurrentRegionalDeEstado] = React.useState({});
  const [regionaisDeEstado, setRegionaisDeEstado] = React.useState([]);
  const [newRegionalDeEstadoData, setNewRegionalDeEstadoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderRegionalDeEstadoModal = () => {
    return (
      <CModal
        visible={regionalDeEstadoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setRegionalDeEstadoModalVisible(false)}>
          <CModalTitle>Detalhes do regional de estado</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentRegionalDeEstado.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentRegionalDeEstado.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteRegionalDeEstado(currentRegionalDeEstado.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setRegionalDeEstadoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddRegionalDeEstadoModal = () => {
    return (
      <CModal
        visible={addRegionalDeEstadoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddRegionalDeEstadoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Regional de Estado</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewRegionalDeEstadoData({ ...newRegionalDeEstadoData, codigo: e.target.value })
            }
            defaultValue={newRegionalDeEstadoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewRegionalDeEstadoData({
                ...newRegionalDeEstadoData,
                nome: e.target.value,
              })
            }
            defaultValue={newRegionalDeEstadoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddRegionalDeEstadoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addRegionalDeEstado(newRegionalDeEstadoData).then((res) =>
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

  const addRegionalDeEstado = async (regionalDeEstado) => {
    const status = await RegionaisDeEstadoService.add(regionalDeEstado);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Regional de Estado adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar regional de estado.',
        severity: 'error',
      });
    return status;
  };

  const deleteRegionalDeEstado = async (regionalDeEstado_id) => {
    const status = await RegionaisDeEstadoService.remove(regionalDeEstado_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Regional de Estado excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir regional de estado.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddRegionalDeEstadoModalVisible(false);
    setNewRegionalDeEstadoData({
      codigo: '',
      nome: '',
    });
    atualizarRegionaisDeEstado();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setRegionalDeEstadoModalVisible(false);
    setCurrentRegionalDeEstado({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarRegionaisDeEstado();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentRegionalDeEstado(row);
    setRegionalDeEstadoModalVisible(true);
  };

  const atualizarRegionaisDeEstado = async () => {
    const regionaisDeEstadoAtualizados = await RegionaisDeEstadoService.getAll();
    setRegionaisDeEstado(regionaisDeEstadoAtualizados);
  };

  React.useEffect(() => {
    atualizarRegionaisDeEstado();
  }, []);

  return (
    <>
      {regionalDeEstadoModalVisible && renderRegionalDeEstadoModal()}
      {addRegionalDeEstadoModalVisible && renderAddRegionalDeEstadoModal()}
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
            onClick={() => setAddRegionalDeEstadoModalVisible(true)}
          >
            Adicionar Regional de Estado <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Regionais de Estado</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={regionaisDeEstado}
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

export default RegionaisDeEstado;
