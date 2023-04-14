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
import * as AcoesService from '../../../services/acoes.service';
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
          {props.acao.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.acao.description !== ''
            ? 'OBS: ' + props.acao.description
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
  acao: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Acoes = () => {
  const [acaoModalVisible, setAcaoModalVisible] = React.useState(false);
  const [addAcaoModalVisible, setAddAcaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentAcao, setCurrentAcao] = React.useState({});
  const [acoes, setAcoes] = React.useState([]);
  const [newAcaoData, setNewAcaoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderAcaoModal = () => {
    return (
      <CModal
        visible={acaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setAcaoModalVisible(false)}>
          <CModalTitle>Detalhes do usuário</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID: <strong>{currentAcao.id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentAcao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentAcao.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteAcao(currentAcao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setAcaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddAcaoModal = () => {
    return (
      <CModal
        visible={addAcaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddAcaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Ação</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewAcaoData({ ...newAcaoData, codigo: e.target.value })
            }
            defaultValue={newAcaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAcaoData({
                ...newAcaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newAcaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newAcaoData.payment_method}
            onChange={(event) => {
              setNewAcaoData({
                ...newAcaoData,
                payment_method: event.target.value,
              });
            }}
          >
            <MenuItem value="pix">Pix</MenuItem>
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
          </Select> */}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddAcaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addAcao(newAcaoData).then((res) =>
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

  const addAcao = async (acao) => {
    const status = await AcoesService.add(acao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Ação adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar usuário.',
        severity: 'error',
      });
    return status;
  };

  const deleteAcao = async (acao_id) => {
    const status = await AcoesService.remove(acao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Ação excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir usuário.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddAcaoModalVisible(false);
    setNewAcaoData({
      codigo: '',
      nome: '',
    });
    atualizarAcoes();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 220 },
    { field: 'nome', headerName: 'Nome', width: 220 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setAcaoModalVisible(false);
    setCurrentAcao({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarAcoes();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentAcao(row);
    setAcaoModalVisible(true);
  };

  const atualizarAcoes = async () => {
    const acoesAtualizados = await AcoesService.getAll();
    setAcoes(acoesAtualizados);
  };

  React.useEffect(() => {
    atualizarAcoes();
  }, []);

  return (
    <>
      {acaoModalVisible && renderAcaoModal()}
      {addAcaoModalVisible && renderAddAcaoModal()}
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
            onClick={() => setAddAcaoModalVisible(true)}
          >
            Adicionar Ação <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Ações</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={acoes}
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

export default Acoes;
