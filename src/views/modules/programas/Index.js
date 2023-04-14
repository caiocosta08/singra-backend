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
import * as ProgramasService from '../../../services/programas.service';
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

const Programas = () => {
  const [programaModalVisible, setProgramaModalVisible] = React.useState(false);
  const [addProgramaModalVisible, setAddProgramaModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentPrograma, setCurrentPrograma] = React.useState({});
  const [programas, setProgramas] = React.useState([]);
  const [newProgramaData, setNewProgramaData] = React.useState({
    codigo: '',
    nome: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderProgramaModal = () => {
    return (
      <CModal
        visible={programaModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setProgramaModalVisible(false)}>
          <CModalTitle>Detalhes do programa</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentPrograma.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentPrograma.nome}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deletePrograma(currentPrograma.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setProgramaModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddProgramaModal = () => {
    return (
      <CModal
        visible={addProgramaModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddProgramaModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Programa</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewProgramaData({ ...newProgramaData, codigo: e.target.value })
            }
            defaultValue={newProgramaData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewProgramaData({
                ...newProgramaData,
                nome: e.target.value,
              })
            }
            defaultValue={newProgramaData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddProgramaModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addPrograma(newProgramaData).then((res) =>
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

  const addPrograma = async (programa) => {
    const status = await ProgramasService.add(programa);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Programa adicionado com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao adicionar programa.',
        severity: 'error',
      });
    return status;
  };

  const deletePrograma = async (programa_id) => {
    const status = await ProgramasService.remove(programa_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Programa excluído com sucesso!',
        severity: 'success',
      });
    }
    else {
      deleteSuccess()
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir programa.',
        severity: 'error',
      });
    }
    return status;
  };

  const addSuccess = async () => {
    setAddProgramaModalVisible(false);
    setNewProgramaData({
      codigo: '',
      nome: '',
    });
    atualizarProgramas();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
  ];

  const deleteSuccess = async () => {
    setProgramaModalVisible(false);
    setCurrentPrograma({
      id: '',
      codigo: '',
      nome: '',
    });
    atualizarProgramas();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentPrograma(row);
    setProgramaModalVisible(true);
  };

  const atualizarProgramas = async () => {
    const programasAtualizados = await ProgramasService.getAll();
    setProgramas(programasAtualizados);
  };

  React.useEffect(() => {
    atualizarProgramas();
  }, []);

  return (
    <>
      {programaModalVisible && renderProgramaModal()}
      {addProgramaModalVisible && renderAddProgramaModal()}
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
            onClick={() => setAddProgramaModalVisible(true)}
          >
            Adicionar Programa <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Programas</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={programas}
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

export default Programas;
