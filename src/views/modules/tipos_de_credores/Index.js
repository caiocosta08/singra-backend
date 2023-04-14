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
import * as TiposDeCredoresService from '../../../services/tipos_de_credores.service';
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
          {props.tipoDeCredor.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.tipoDeCredor.description !== ''
            ? 'OBS: ' + props.tipoDeCredor.description
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
  tipoDeCredor: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const TiposDeCredores = () => {
  const [tipoDeCredorModalVisible, setTipoDeCredorModalVisible] = React.useState(false);
  const [addTipoDeCredorModalVisible, setAddTipoDeCredorModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentTipoDeCredor, setCurrentTipoDeCredor] = React.useState({});
  const [tiposDeCredores, setTiposDeCredores] = React.useState([]);
  const [newTipoDeCredorData, setNewTipoDeCredorData] = React.useState({
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderTipoDeCredorModal = () => {
    return (
      <CModal
        visible={tipoDeCredorModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setTipoDeCredorModalVisible(false)}>
          <CModalTitle>Detalhes do tipo de credor</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentTipoDeCredor.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteTipoDeCredor(currentTipoDeCredor.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setTipoDeCredorModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddTipoDeCredorModal = () => {
    return (
      <CModal
        visible={addTipoDeCredorModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddTipoDeCredorModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Tipo de Credor</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewTipoDeCredorData({
                ...newTipoDeCredorData,
                nome: e.target.value,
              })
            }
            defaultValue={newTipoDeCredorData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddTipoDeCredorModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addTipoDeCredor(newTipoDeCredorData).then((res) =>
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

  const addTipoDeCredor = async (tipoDeCredor) => {
    const status = await TiposDeCredoresService.add(tipoDeCredor);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Tipo de Credor adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar tipo de credor.',
        severity: 'error',
      });
    return status;
  };

  const deleteTipoDeCredor = async (tipoDeCredor_id) => {
    const status = await TiposDeCredoresService.remove(tipoDeCredor_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Tipo de Credor excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir tipo de credor.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddTipoDeCredorModalVisible(false);
    setNewTipoDeCredorData({
      nome: '',
    });
    atualizarTiposDeCredores();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nome', headerName: 'Nome', width: 190 },
  ];

  const deleteSuccess = async () => {
    setTipoDeCredorModalVisible(false);
    setCurrentTipoDeCredor({
      id: '',
      nome: '',
    });
    atualizarTiposDeCredores();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentTipoDeCredor(row);
    setTipoDeCredorModalVisible(true);
  };

  const atualizarTiposDeCredores = async () => {
    const tiposDeCredoresAtualizados = await TiposDeCredoresService.getAll();
    setTiposDeCredores(tiposDeCredoresAtualizados);
  };

  React.useEffect(() => {
    atualizarTiposDeCredores();
  }, []);

  return (
    <>
      {tipoDeCredorModalVisible && renderTipoDeCredorModal()}
      {addTipoDeCredorModalVisible && renderAddTipoDeCredorModal()}
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
            onClick={() => setAddTipoDeCredorModalVisible(true)}
          >
            Adicionar Tipo de Credor <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Tipos de Credores</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={tiposDeCredores}
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

export default TiposDeCredores;
