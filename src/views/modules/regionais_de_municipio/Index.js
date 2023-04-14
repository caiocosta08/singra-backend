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
import * as RegionaisDeMunicipioService from '../../../services/regionais_de_municipio.service';
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

const RegionaisDeMunicipio = () => {
  const [regionalDeMunicipioModalVisible, setRegionalDeMunicipioModalVisible] = React.useState(false);
  const [addRegionalDeMunicipioModalVisible, setAddRegionalDeMunicipioModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentRegionalDeMunicipio, setCurrentRegionalDeMunicipio] = React.useState({});
  const [regionaisDeMunicipio, setRegionaisDeMunicipio] = React.useState([]);
  const [newRegionalDeMunicipioData, setNewRegionalDeMunicipioData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderRegionalDeMunicipioModal = () => {
    return (
      <CModal
        visible={regionalDeMunicipioModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setRegionalDeMunicipioModalVisible(false)}>
          <CModalTitle>Detalhes do regional de município</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentRegionalDeMunicipio.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentRegionalDeMunicipio.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteRegionalDeMunicipio(currentRegionalDeMunicipio.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setRegionalDeMunicipioModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddRegionalDeMunicipioModal = () => {
    return (
      <CModal
        visible={addRegionalDeMunicipioModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddRegionalDeMunicipioModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Regional de Município</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewRegionalDeMunicipioData({ ...newRegionalDeMunicipioData, codigo: e.target.value })
            }
            defaultValue={newRegionalDeMunicipioData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewRegionalDeMunicipioData({
                ...newRegionalDeMunicipioData,
                nome: e.target.value,
              })
            }
            defaultValue={newRegionalDeMunicipioData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddRegionalDeMunicipioModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addRegionalDeMunicipio(newRegionalDeMunicipioData).then((res) =>
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

  const addRegionalDeMunicipio = async (regionalDeMunicipio) => {
    const status = await RegionaisDeMunicipioService.add(regionalDeMunicipio);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Regional de Município adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar regional de município.',
        severity: 'error',
      });
    return status;
  };

  const deleteRegionalDeMunicipio = async (regionalDeMunicipio_id) => {
    const status = await RegionaisDeMunicipioService.remove(regionalDeMunicipio_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Regional de Município excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir regional de município.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddRegionalDeMunicipioModalVisible(false);
    setNewRegionalDeMunicipioData({
      codigo: '',
      nome: '',
    });
    atualizarRegionaisDeMunicipio();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setRegionalDeMunicipioModalVisible(false);
    setCurrentRegionalDeMunicipio({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarRegionaisDeMunicipio();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentRegionalDeMunicipio(row);
    setRegionalDeMunicipioModalVisible(true);
  };

  const atualizarRegionaisDeMunicipio = async () => {
    const regionaisDeMunicipioAtualizados = await RegionaisDeMunicipioService.getAll();
    setRegionaisDeMunicipio(regionaisDeMunicipioAtualizados);
  };

  React.useEffect(() => {
    atualizarRegionaisDeMunicipio();
  }, []);

  return (
    <>
      {regionalDeMunicipioModalVisible && renderRegionalDeMunicipioModal()}
      {addRegionalDeMunicipioModalVisible && renderAddRegionalDeMunicipioModal()}
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
            onClick={() => setAddRegionalDeMunicipioModalVisible(true)}
          >
            Adicionar Regional de Município <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Regionais de Município</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={regionaisDeMunicipio}
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

export default RegionaisDeMunicipio;
