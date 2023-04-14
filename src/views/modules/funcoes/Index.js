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
import * as FuncoesService from '../../../services/funcoes.service';
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
          {props.funcao.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.funcao.description !== ''
            ? 'OBS: ' + props.funcao.description
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
  funcao: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Funcoes = () => {
  const [funcaoModalVisible, setFuncaoModalVisible] = React.useState(false);
  const [addFuncaoModalVisible, setAddFuncaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentFuncao, setCurrentFuncao] = React.useState({});
  const [funcoes, setFuncoes] = React.useState([]);
  const [newFuncaoData, setNewFuncaoData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderFuncaoModal = () => {
    return (
      <CModal
        visible={funcaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setFuncaoModalVisible(false)}>
          <CModalTitle>Detalhes do função</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentFuncao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentFuncao.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteFuncao(currentFuncao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setFuncaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddFuncaoModal = () => {
    return (
      <CModal
        visible={addFuncaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddFuncaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Função</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewFuncaoData({ ...newFuncaoData, codigo: e.target.value })
            }
            defaultValue={newFuncaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewFuncaoData({
                ...newFuncaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newFuncaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddFuncaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addFuncao(newFuncaoData).then((res) =>
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

  const addFuncao = async (funcao) => {
    const status = await FuncoesService.add(funcao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Função adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar função.',
        severity: 'error',
      });
    return status;
  };

  const deleteFuncao = async (funcao_id) => {
    const status = await FuncoesService.remove(funcao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Função excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir função.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddFuncaoModalVisible(false);
    setNewFuncaoData({
      codigo: '',
      nome: '',
    });
    atualizarFuncoes();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setFuncaoModalVisible(false);
    setCurrentFuncao({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarFuncoes();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentFuncao(row);
    setFuncaoModalVisible(true);
  };

  const atualizarFuncoes = async () => {
    const funcoesAtualizados = await FuncoesService.getAll();
    setFuncoes(funcoesAtualizados);
  };

  React.useEffect(() => {
    atualizarFuncoes();
  }, []);

  return (
    <>
      {funcaoModalVisible && renderFuncaoModal()}
      {addFuncaoModalVisible && renderAddFuncaoModal()}
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
            onClick={() => setAddFuncaoModalVisible(true)}
          >
            Adicionar Função <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Funções</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={funcoes}
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

export default Funcoes;
