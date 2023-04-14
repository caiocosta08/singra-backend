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
import * as MunicipiosService from '../../../services/municipios.service';
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




const BasicCard = (props) => {
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: props.color }}
      style={{ margin: 10, width: 200, height: 200, color: '#fff' }}
    >
      <CardContent onClick={props.onClick}>
        <Typography variant="h5" component="div">
          {props.municipio.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.municipio.description !== ''
            ? 'OBS: ' + props.municipio.description
            : ''}{' '}
          <div>
            <AttachMoney /> {props.payment_status}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

BasicCard.propTypes = {
  onClick: PropTypes.func,
  municipio: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Municipios = () => {
  const [municipioModalVisible, setMunicipioModalVisible] = React.useState(false);
  const [addMunicipioModalVisible, setAddMunicipioModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentMunicipio, setCurrentMunicipio] = React.useState({});
  const [municipios, setMunicipios] = React.useState([]);
  const [newMunicipioData, setNewMunicipioData] = React.useState({
    codigo: '',
    nome: '',
    vinculacao_regional: '',
    idh_2022: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderMunicipioModal = () => {
    return (
      <CModal
        visible={municipioModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setMunicipioModalVisible(false)}>
          <CModalTitle>Detalhes do município</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentMunicipio.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentMunicipio.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Vinculação regional: <strong>{currentMunicipio.vinculacao_regional}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          IDH 2022: <strong>{currentMunicipio.idh_2022}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteMunicipio(currentMunicipio.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setMunicipioModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddMunicipioModal = () => {
    return (
      <CModal
        visible={addMunicipioModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddMunicipioModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Município</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewMunicipioData({ ...newMunicipioData, codigo: e.target.value })
            }
            defaultValue={newMunicipioData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewMunicipioData({
                ...newMunicipioData,
                nome: e.target.value,
              })
            }
            defaultValue={newMunicipioData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewMunicipioData({
                ...newMunicipioData,
                vinculacao_regional: e.target.value,
              })
            }
            defaultValue={newMunicipioData.vinculacao_regional}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a vinculação regional"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewMunicipioData({
                ...newMunicipioData,
                idh_2022: e.target.value,
              })
            }
            defaultValue={newMunicipioData.idh_2022}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o IDH 2022"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddMunicipioModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addMunicipio(newMunicipioData).then((res) =>
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

  const addMunicipio = async (municipio) => {
    const status = await MunicipiosService.add(municipio);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Município adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar município.',
        severity: 'error',
      });
    return status;
  };

  const deleteMunicipio = async (municipio_id) => {
    const status = await MunicipiosService.remove(municipio_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Município excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir município.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddMunicipioModalVisible(false);
    setNewMunicipioData({
      codigo: '',
      nome: '',
      vinculacao_regional: '',
      idh_2022: '',
    });
    atualizarMunicipios();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'vinculacao_regional', headerName: 'Vinculação regional', width: 200 },
    { field: 'idh_2022', headerName: 'IDH 2022', width: 200 },
  ];

  const deleteSuccess = async () => {
    setMunicipioModalVisible(false);
    setCurrentMunicipio({
      id: '',
      codigo: '',
      nome: '',
      vinculacao_regional: '',
      idh_2022: '',
    });
    atualizarMunicipios();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentMunicipio(row);
    setMunicipioModalVisible(true);
  };

  const atualizarMunicipios = async () => {
    const municipiosAtualizados = await MunicipiosService.getAll();
    setMunicipios(municipiosAtualizados);
  };

  React.useEffect(() => {
    atualizarMunicipios();
  }, []);

  return (
    <>
      {municipioModalVisible && renderMunicipioModal()}
      {addMunicipioModalVisible && renderAddMunicipioModal()}
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
            onClick={() => setAddMunicipioModalVisible(true)}
          >
            Adicionar Município <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Municípios</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={municipios}
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

export default Municipios;
