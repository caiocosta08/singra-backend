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
import * as UsuariosService from '../../../services/usuarios.service';
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
import ModalAddItem from './ModalAdd';
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
import { jsPDF } from 'jspdf';

import io from 'socket.io-client';
import { formatMoney } from 'src/services/utils.service';
const socket = io('https://goldfish-app-4t6d6.ondigitalocean.app/');

const BasicCard = (props) => {
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: props.color }}
      style={{ margin: 10, width: 200, height: 200, color: '#fff' }}
    >
      <CardContent onClick={props.onClick}>
        <Typography variant="h5" component="div">
          {props.usuario.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.usuario.description !== ''
            ? 'OBS: ' + props.usuario.description
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
  usuario: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Usuarios = () => {
  const [usuarioModalVisible, setUsuarioModalVisible] = React.useState(false);
  const [addUsuarioModalVisible, setAddUsuarioModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentUsuario, setCurrentUsuario] = React.useState({});
  const [usuarios, setUsuarios] = React.useState([]);
  const [newUsuarioData, setNewUsuarioData] = React.useState({
    codigo: '',
    nome: '',
    cpf: '',
    matricula: '',
    email_institucional: '',
    email_pessoal: '',
    telefone: '',
    telefone_whatsapp: '',
    orgao_id: '',
    unidade_gestora_id: '',
    setor_administrativo_id: '',
    cargo_id: '',
    situacao_de_registro: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderUsuarioModal = () => {
    return (
      <CModal
        visible={usuarioModalVisible}
        onClose={() => setUsuarioModalVisible(false)}
      >
        <CModalHeader onClose={() => setUsuarioModalVisible(false)}>
          <CModalTitle>Detalhes do usuário</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentUsuario.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentUsuario.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CPF: <strong>{currentUsuario.cpf}</strong>
        </div>
        <CModalFooter>
          {/* <CButton
            color="secondary"
            onClick={() =>
              deleteUsuario(currentUsuario._id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton> */}
          <CButton
            color="secondary"
            onClick={() => setUsuarioModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddUsuarioModal = () => {
    return (
      <CModal
        visible={addUsuarioModalVisible}
        onClose={() => setAddUsuarioModalVisible(false)}
      >
        <CModalHeader onClose={() => setAddUsuarioModalVisible(false)}>
          <CModalTitle>Adicionar Usuário</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel>
          <TextField
            onChange={(e) =>
              setNewUsuarioData({ ...newUsuarioData, codigo: e.target.value })
            }
            defaultValue={newUsuarioData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUsuarioData({
                ...newUsuarioData,
                nome: e.target.value,
              })
            }
            defaultValue={newUsuarioData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewUsuarioData({
                ...newUsuarioData,
                cpf: e.target.value,
              })
            }
            defaultValue={newUsuarioData.cpf}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o CPF"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newUsuarioData.payment_method}
            onChange={(event) => {
              setNewUsuarioData({
                ...newUsuarioData,
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
            onClick={() => setAddUsuarioModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addUsuario(newUsuarioData).then((res) =>
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

  const addUsuario = async (usuario) => {
    const status = await UsuariosService.add(usuario);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Usuário adicionado com sucesso!',
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

  const deleteUsuario = async (usuario_id) => {
    const status = await UsuariosService.remove(usuario_id);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Usuário excluído com sucesso!',
        severity: 'success',
      });
    else
      setAlertBox({
        visible: true,
        text: 'Erro ao excluir usuário.',
        severity: 'error',
      });
    return status;
  };

  const addSuccess = async () => {
    setAddUsuarioModalVisible(false);
    setNewUsuarioData({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'codigo',
      headerName: 'Código',
      width: 100,
    },
    { field: 'nome', headerName: 'Nome', width: 190 },
    { field: 'cpf', headerName: 'CPF', width: 190 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setUsuarioModalVisible(false);
    setCurrentUsuario({
      items: [],
      price: 0,
      status: 'pending',
      payment_status: 'pending',
      client: '',
      payment_method: '',
      date: '',
      description: '',
    });
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentUsuario(row);
    setUsuarioModalVisible(true);
  };

  const atualizarUsuarios = async () => {
    const usuariosAtualizados = await UsuariosService.getUsuarios();
    setUsuarios(usuariosAtualizados);
  };

  React.useEffect(() => {
    atualizarUsuarios();
  }, []);

  return (
    <>
      {usuarioModalVisible && renderUsuarioModal()}
      {addUsuarioModalVisible && renderAddUsuarioModal()}
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
            onClick={() => setAddUsuarioModalVisible(true)}
          >
            Adicionar Usuário <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Usuários</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={usuarios}
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

export default Usuarios;
