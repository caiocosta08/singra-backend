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
import * as AberturasDeExercicioFinanceiroService from '../../../services/abertura_de_exercicio_financeiro.service';
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
          {props.exercicio.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.exercicio.description !== ''
            ? 'OBS: ' + props.exercicio.description
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
  exercicio: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const AberturasDeExercicioFinanceiro = () => {
  const [exercicioModalVisible, setAberturaDeExercicioFinanceiroModalVisible] = React.useState(false);
  const [addAberturaDeExercicioFinanceiroModalVisible, setAddAberturaDeExercicioFinanceiroModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentAberturaDeExercicioFinanceiro, setCurrentAberturaDeExercicioFinanceiro] = React.useState({});
  const [exercicios, setAberturasDeExercicioFinanceiro] = React.useState([]);
  const [newAberturaDeExercicioFinanceiroData, setNewAberturaDeExercicioFinanceiroData] = React.useState({
    exercicio: '',
    instituicao_id: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderAberturaDeExercicioFinanceiroModal = () => {
    return (
      <CModal
        visible={exercicioModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setAberturaDeExercicioFinanceiroModalVisible(false)}>
          <CModalTitle>Detalhes do exercício</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID: <strong>{currentAberturaDeExercicioFinanceiro.id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Exercício: <strong>{currentAberturaDeExercicioFinanceiro.exercicio}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID da Instituição: <strong>{currentAberturaDeExercicioFinanceiro.instituicao_id}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteAberturaDeExercicioFinanceiro(currentAberturaDeExercicioFinanceiro.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setAberturaDeExercicioFinanceiroModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddAberturaDeExercicioFinanceiroModal = () => {
    return (
      <CModal
        visible={addAberturaDeExercicioFinanceiroModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddAberturaDeExercicioFinanceiroModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Abertura De Exercicio Financeiro</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          {/* <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel> */}
          <TextField
            onChange={(e) =>
              setNewAberturaDeExercicioFinanceiroData({ ...newAberturaDeExercicioFinanceiroData, exercicio: e.target.value })
            }
            defaultValue={newAberturaDeExercicioFinanceiroData.exercicio}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o exercício"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAberturaDeExercicioFinanceiroData({
                ...newAberturaDeExercicioFinanceiroData,
                instituicao_id: e.target.value,
              })
            }
            defaultValue={newAberturaDeExercicioFinanceiroData.instituicao_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o ID da Instituição"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newAberturaDeExercicioFinanceiroData.payment_method}
            onChange={(event) => {
              setNewAberturaDeExercicioFinanceiroData({
                ...newAberturaDeExercicioFinanceiroData,
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
            onClick={() => setAddAberturaDeExercicioFinanceiroModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addAberturaDeExercicioFinanceiro(newAberturaDeExercicioFinanceiroData).then((res) =>
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

  const addAberturaDeExercicioFinanceiro = async (exercicio) => {
    const status = await AberturasDeExercicioFinanceiroService.add(exercicio);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Abertura De Exercicio Financeiro adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar exercício.',
        severity: 'error',
      });
    return status;
  };

  const deleteAberturaDeExercicioFinanceiro = async (exercicio_id) => {
    const status = await AberturasDeExercicioFinanceiroService.remove(exercicio_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Abertura De Exercicio Financeiro excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir exercício.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddAberturaDeExercicioFinanceiroModalVisible(false);
    setNewAberturaDeExercicioFinanceiroData({
      exercicio: '',
      instituicao_id: '',
    });
    atualizarAberturasDeExercicioFinanceiro();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'exercicio', headerName: 'Exercício', width: 190 },
    { field: 'instituicao_id', headerName: 'ID da Instituição', width: 190 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setAberturaDeExercicioFinanceiroModalVisible(false);
    setCurrentAberturaDeExercicioFinanceiro({
      id: '',
      exercicio: '',
      instituicao_id: '',
    });
    atualizarAberturasDeExercicioFinanceiro();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentAberturaDeExercicioFinanceiro(row);
    setAberturaDeExercicioFinanceiroModalVisible(true);
  };

  const atualizarAberturasDeExercicioFinanceiro = async () => {
    const exerciciosAtualizados = await AberturasDeExercicioFinanceiroService.getAll();
    setAberturasDeExercicioFinanceiro(exerciciosAtualizados);
  };

  React.useEffect(() => {
    atualizarAberturasDeExercicioFinanceiro();
  }, []);

  return (
    <>
      {exercicioModalVisible && renderAberturaDeExercicioFinanceiroModal()}
      {addAberturaDeExercicioFinanceiroModalVisible && renderAddAberturaDeExercicioFinanceiroModal()}
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
            onClick={() => setAddAberturaDeExercicioFinanceiroModalVisible(true)}
          >
            Adicionar Abertura De Exercicio Financeiro <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Abertura De Exercicio Financeiro</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={exercicios}
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

export default AberturasDeExercicioFinanceiro;
