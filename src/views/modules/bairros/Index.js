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
import * as BairrosService from '../../../services/bairros.service';
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
          {props.bairro.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.bairro.description !== ''
            ? 'OBS: ' + props.bairro.description
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
  bairro: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Bairros = () => {
  const [bairroModalVisible, setBairroModalVisible] = React.useState(false);
  const [addBairroModalVisible, setAddBairroModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentBairro, setCurrentBairro] = React.useState({});
  const [bairros, setBairros] = React.useState([]);
  const [newBairroData, setNewBairroData] = React.useState({
    codigo: '',
    nome: '',
    vinculacao_regional: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderBairroModal = () => {
    return (
      <CModal
        visible={bairroModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setBairroModalVisible(false)}>
          <CModalTitle>Detalhes do bairro</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentBairro.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentBairro.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Vinculação regional: <strong>{currentBairro.vinculacao_regional}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteBairro(currentBairro.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setBairroModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddBairroModal = () => {
    return (
      <CModal
        visible={addBairroModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddBairroModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Bairro</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewBairroData({ ...newBairroData, codigo: e.target.value })
            }
            defaultValue={newBairroData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewBairroData({
                ...newBairroData,
                nome: e.target.value,
              })
            }
            defaultValue={newBairroData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewBairroData({
                ...newBairroData,
                vinculacao_regional: e.target.value,
              })
            }
            defaultValue={newBairroData.vinculacao_regional}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a vinculação regional"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddBairroModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addBairro(newBairroData).then((res) =>
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

  const addBairro = async (bairro) => {
    const status = await BairrosService.add(bairro);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Bairro adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar bairro.',
        severity: 'error',
      });
    return status;
  };

  const deleteBairro = async (bairro_id) => {
    const status = await BairrosService.remove(bairro_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Bairro excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir bairro.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddBairroModalVisible(false);
    setNewBairroData({
      codigo: '',
      nome: '',
      vinculacao_regional: '',
    });
    atualizarBairros();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'vinculacao_regional', headerName: 'Vinculação regional', width: 200 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setBairroModalVisible(false);
    setCurrentBairro({
      id: '',
      codigo: '',
      nome: '',
      vinculacao_regional: '',
    });
    atualizarBairros();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentBairro(row);
    setBairroModalVisible(true);
  };

  const atualizarBairros = async () => {
    const bairrosAtualizados = await BairrosService.getAll();
    setBairros(bairrosAtualizados);
  };

  React.useEffect(() => {
    atualizarBairros();
  }, []);

  return (
    <>
      {bairroModalVisible && renderBairroModal()}
      {addBairroModalVisible && renderAddBairroModal()}
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
            onClick={() => setAddBairroModalVisible(true)}
          >
            Adicionar Bairro <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Bairros</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={bairros}
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

export default Bairros;
