import React from 'react';
import PropTypes from 'prop-types';
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
import * as CargosAdministrativosService from '../../../services/cargos_administrativos.service';
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

const CargosAdministrativos = () => {
  const [cargoAdministrativoModalVisible, setCargoAdministrativoModalVisible] = React.useState(false);
  const [addCargoAdministrativoModalVisible, setAddCargoAdministrativoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentCargoAdministrativo, setCurrentCargoAdministrativo] = React.useState({});
  const [cargosAdministrativos, setCargosAdministrativos] = React.useState([]);
  const [newCargoAdministrativoData, setNewCargoAdministrativoData] = React.useState({
    codigo: '',
    nome: '',
    orgao_id: '',
    unidade_gestora_id: '',
    setor_administrativo_id: '',
    situacao_de_registro: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderCargoAdministrativoModal = () => {
    return (
      <CModal
        visible={cargoAdministrativoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setCargoAdministrativoModalVisible(false)}>
          <CModalTitle>Detalhes do cargo administrativo</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentCargoAdministrativo.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentCargoAdministrativo.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do órgão: <strong>{currentCargoAdministrativo.orgao_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID da unidade gestora: <strong>{currentCargoAdministrativo.unidade_gestora_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID do setor administrativo: <strong>{currentCargoAdministrativo.setor_administrativo_id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Situação de registro: <strong>{currentCargoAdministrativo.situacao_de_registro}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteCargoAdministrativo(currentCargoAdministrativo.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setCargoAdministrativoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddCargoAdministrativoModal = () => {
    return (
      <CModal
        visible={addCargoAdministrativoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddCargoAdministrativoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Cargo Administrativo</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({ ...newCargoAdministrativoData, codigo: e.target.value })
            }
            defaultValue={newCargoAdministrativoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
                nome: e.target.value,
              })
            }
            defaultValue={newCargoAdministrativoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
                orgao_id: e.target.value,
              })
            }
            defaultValue={newCargoAdministrativoData.orgao_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id do órgão"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
                unidade_gestora_id: e.target.value,
              })
            }
            defaultValue={newCargoAdministrativoData.unidade_gestora_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id da unidade gestora"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
                setor_administrativo_id: e.target.value,
              })
            }
            defaultValue={newCargoAdministrativoData.setor_administrativo_id}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o id do setor administrativo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
                situacao_de_registro: e.target.value,
              })
            }
            defaultValue={newCargoAdministrativoData.situacao_de_registro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a situação de registro"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newCargoAdministrativoData.payment_method}
            onChange={(event) => {
              setNewCargoAdministrativoData({
                ...newCargoAdministrativoData,
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
            onClick={() => setAddCargoAdministrativoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addCargoAdministrativo(newCargoAdministrativoData).then((res) =>
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

  const addCargoAdministrativo = async (cargoAdministrativo) => {
    const status = await CargosAdministrativosService.add(cargoAdministrativo);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Cargo Administrativo adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar cargo administrativo.',
        severity: 'error',
      });
    return status;
  };

  const deleteCargoAdministrativo = async (cargoAdministrativo_id) => {
    const status = await CargosAdministrativosService.remove(cargoAdministrativo_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Cargo Administrativo excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir cargo administrativo.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddCargoAdministrativoModalVisible(false);
    setNewCargoAdministrativoData({
      codigo: '',
      nome: '',
      orgao_id: '',
      unidade_gestora_id: '',
      setor_administrativo_id: '',
      situacao_de_registro: '',
    });
    atualizarCargosAdministrativos();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 220 },
    { field: 'nome', headerName: 'Nome', width: 220 },
    { field: 'orgao_id', headerName: 'ID do órgão', width: 220 },
    { field: 'unidade_gestora_id', headerName: 'ID da unidade gestora', width: 220 },
    { field: 'setor_administrativo_id', headerName: 'ID do setor administrativo', width: 220 },
    { field: 'situacao_de_registro', headerName: 'Situação de registro', width: 220 },
  ];

  const deleteSuccess = async () => {
    setCargoAdministrativoModalVisible(false);
    setCurrentCargoAdministrativo({
      id: '',
      codigo: '',
      nome: '',
      orgao_id: '',
      unidade_gestora_id: '',
      setor_administrativo_id: '',
      situacao_de_registro: '',
    });
    atualizarCargosAdministrativos();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentCargoAdministrativo(row);
    setCargoAdministrativoModalVisible(true);
  };

  const atualizarCargosAdministrativos = async () => {
    const cargosAdministrativosAtualizados = await CargosAdministrativosService.getAll();
    setCargosAdministrativos(cargosAdministrativosAtualizados);
  };

  React.useEffect(() => {
    atualizarCargosAdministrativos();
  }, []);

  return (
    <>
      {cargoAdministrativoModalVisible && renderCargoAdministrativoModal()}
      {addCargoAdministrativoModalVisible && renderAddCargoAdministrativoModal()}
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
            onClick={() => setAddCargoAdministrativoModalVisible(true)}
          >
            Adicionar Cargo Administrativo <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Cargos Administrativos</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={cargosAdministrativos}
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

export default CargosAdministrativos;
