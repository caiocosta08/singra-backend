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
import * as AgenciasBancariasService from '../../../services/agencias_bancarias.service';
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
          {props.agenciaBancaria.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.agenciaBancaria.description !== ''
            ? 'OBS: ' + props.agenciaBancaria.description
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
  agenciaBancaria: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const AgenciasBancarias = () => {
  const [agenciaBancariaModalVisible, setAgenciaBancariaModalVisible] = React.useState(false);
  const [addAgenciaBancariaModalVisible, setAddAgenciaBancariaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentAgenciaBancaria, setCurrentAgenciaBancaria] = React.useState({});
  const [agenciasBancarias, setAgenciasBancarias] = React.useState([]);
  const [newAgenciaBancariaData, setNewAgenciaBancariaData] = React.useState({
    banco: '',
    codigo: '',
    nome: '',
    nome_abreviado: '',
    cnpj_unidade_gestora: '',
    praca_pagamento: '',
    situacao_de_registro: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderAgenciaBancariaModal = () => {
    return (
      <CModal
        visible={agenciaBancariaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setAgenciaBancariaModalVisible(false)}>
          <CModalTitle>Detalhes da Agência Bancária</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Banco: <strong>{currentAgenciaBancaria.banco}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentAgenciaBancaria.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentAgenciaBancaria.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentAgenciaBancaria.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CNPJ unidade gestora: <strong>{currentAgenciaBancaria.cnpj_unidade_gestora}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Praça de pagamento: <strong>{currentAgenciaBancaria.praca_pagamento}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Situação de registro: <strong>{currentAgenciaBancaria.situacao_de_registro}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteAgenciaBancaria(currentAgenciaBancaria.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setAgenciaBancariaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddAgenciaBancariaModal = () => {
    return (
      <CModal
        visible={addAgenciaBancariaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddAgenciaBancariaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Agência Bancária</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({ ...newAgenciaBancariaData, banco: e.target.value })
            }
            defaultValue={newAgenciaBancariaData.banco}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o banco"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                codigo: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                nome: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                cpnj_unidade_gestora: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.cpnj_unidade_gestora}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o CNPJ da unidade gestora"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                praca_pagamento: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.praca_pagamento}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a praça de pagamento"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAgenciaBancariaData({
                ...newAgenciaBancariaData,
                situacao_de_registro: e.target.value,
              })
            }
            defaultValue={newAgenciaBancariaData.situacao_de_registro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a situação de registro"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddAgenciaBancariaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addAgenciaBancaria(newAgenciaBancariaData).then((res) =>
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

  const addAgenciaBancaria = async (agenciaBancaria) => {
    const status = await AgenciasBancariasService.add(agenciaBancaria);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Agência Bancária adicionada com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar Agência Bancária.',
        severity: 'error',
      });
    return status;
  };

  const deleteAgenciaBancaria = async (agenciaBancaria_id) => {
    const status = await AgenciasBancariasService.remove(agenciaBancaria_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Agência Bancária excluída com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir Agência Bancária.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddAgenciaBancariaModalVisible(false);
    setNewAgenciaBancariaData({
      banco: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      cnpj_unidade_gestora: '',
      praca_pagamento: '',
      situacao_de_registro: '',
    });
    atualizarAgenciasBancarias();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'banco', headerName: 'Banco', width: 200 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nome_abreviado', headerName: 'Nome abreviado', width: 200 },
    { field: 'cnpj', headerName: 'CNPJ Unidade gestora', width: 200 },
    { field: 'praca_pagamento', headerName: 'Praça de pagamento', width: 200 },
    { field: 'situacao_de_registro', headerName: 'Situação de registro', width: 200 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setAgenciaBancariaModalVisible(false);
    setCurrentAgenciaBancaria({
      id: '',
      banco: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      cnpj_unidade_gestora: '',
      praca_pagamento: '',
      situacao_de_registro: '',
    });
    atualizarAgenciasBancarias();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentAgenciaBancaria(row);
    setAgenciaBancariaModalVisible(true);
  };

  const atualizarAgenciasBancarias = async () => {
    const agenciasBancariasAtualizados = await AgenciasBancariasService.getAll();
    setAgenciasBancarias(agenciasBancariasAtualizados);
  };

  React.useEffect(() => {
    atualizarAgenciasBancarias();
  }, []);

  return (
    <>
      {agenciaBancariaModalVisible && renderAgenciaBancariaModal()}
      {addAgenciaBancariaModalVisible && renderAddAgenciaBancariaModal()}
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
            onClick={() => setAddAgenciaBancariaModalVisible(true)}
          >
            Adicionar Agência Bancária <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Agências Bancárias</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={agenciasBancarias}
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

export default AgenciasBancarias;
