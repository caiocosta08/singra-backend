import React from 'react';
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
import * as OrgaosService from '../../../services/orgaos.service';
import { DataGrid } from '@mui/x-data-grid';
import {
  Alert,
  TextField,
  Snackbar,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  Add,
  AttachMoney,
} from '@mui/icons-material';

const Orgaos = () => {
  const [orgaoModalVisible, setOrgaoModalVisible] = React.useState(false);
  const [addOrgaoModalVisible, setAddOrgaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentOrgao, setCurrentOrgao] = React.useState({});
  const [orgaos, setOrgaos] = React.useState([]);
  const [newOrgaoData, setNewOrgaoData] = React.useState({
    codigo: '',
    nome: '',
    nome_abreviado: '',
    poder_vinculado: '',
    nome_anterior: '',
    nome_abreviado_anterior: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderOrgaoModal = () => {
    return (
      <CModal
        visible={orgaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setOrgaoModalVisible(false)}>
          <CModalTitle>Detalhes do usuário</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentOrgao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentOrgao.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentOrgao.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Poder vinculado: <strong>{currentOrgao.poder_vinculado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome anterior: <strong>{currentOrgao.nome_anterior}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado anterior: <strong>{currentOrgao.nome_abreviado_anterior}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteOrgao(currentOrgao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setOrgaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddOrgaoModal = () => {
    return (
      <CModal
        visible={addOrgaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddOrgaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Órgão</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewOrgaoData({ ...newOrgaoData, codigo: e.target.value })
            }
            defaultValue={newOrgaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrgaoData({
                ...newOrgaoData,
                nome: e.target.value,
              })
            }
            defaultValue={newOrgaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrgaoData({
                ...newOrgaoData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newOrgaoData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrgaoData({
                ...newOrgaoData,
                poder_vinculado: e.target.value,
              })
            }
            defaultValue={newOrgaoData.poder_vinculado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o poder vinculado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrgaoData({
                ...newOrgaoData,
                nome_anterior: e.target.value,
              })
            }
            defaultValue={newOrgaoData.nome_anterior}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome anterior"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewOrgaoData({
                ...newOrgaoData,
                nome_abreviado_anterior: e.target.value,
              })
            }
            defaultValue={newOrgaoData.nome_abreviado_anterior}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado anterior"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddOrgaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addOrgao(newOrgaoData).then((res) =>
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

  const addOrgao = async (orgao) => {
    const status = await OrgaosService.add(orgao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Órgão adicionado com sucesso!',
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

  const deleteOrgao = async (orgao_id) => {
    const status = await OrgaosService.remove(orgao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Órgão excluído com sucesso!',
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
    setAddOrgaoModalVisible(false);
    setNewOrgaoData({
      codigo: '',
      nome: '',
      nome_abreviado: '',
      poder_vinculado: '',
      nome_anterior: '',
      nome_abreviado_anterior: '',
    });
    atualizarOrgaos();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nome_abreviado', headerName: 'Nome abreviado', width: 200 },
    { field: 'poder_vinculado', headerName: 'Poder vinculado', width: 200 },
    { field: 'nome_anterior', headerName: 'Nome anterior', width: 200 },
    { field: 'nome_abreviado_anterior', headerName: 'Nome abreviado anterior', width: 200 },
  ];

  const deleteSuccess = async () => {
    setOrgaoModalVisible(false);
    setCurrentOrgao({
      id: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      poder_vinculado: '',
      nome_anterior: '',
      nome_abreviado_anterior: '',
    });
    atualizarOrgaos();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentOrgao(row);
    setOrgaoModalVisible(true);
  };

  const atualizarOrgaos = async () => {
    const orgaosAtualizados = await OrgaosService.getAll();
    setOrgaos(orgaosAtualizados);
  };

  React.useEffect(() => {
    atualizarOrgaos();
  }, []);

  return (
    <>
      {orgaoModalVisible && renderOrgaoModal()}
      {addOrgaoModalVisible && renderAddOrgaoModal()}
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
            onClick={() => setAddOrgaoModalVisible(true)}
          >
            Adicionar Órgão <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Órgãos</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={orgaos}
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

export default Orgaos;
