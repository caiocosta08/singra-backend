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
import * as InstituicoesService from '../../../services/instituicoes.service';
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
          {props.Instituicao.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.Instituicao.description !== ''
            ? 'OBS: ' + props.Instituicao.description
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
  Instituicao: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const Instituicoes = () => {
  const [InstituicaoModalVisible, setInstituicaoModalVisible] = React.useState(false);
  const [addInstituicaoModalVisible, setAddInstituicaoModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentInstituicao, setCurrentInstituicao] = React.useState({});
  const [Instituicoes, setInstituicoes] = React.useState([]);
  const [newInstituicaoData, setNewInstituicaoData] = React.useState({
    codigo: '',
    nome: '',
    nome_abreviado: '',
    cnpj: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    uf: '',
    municipio: '',
    email: '',
    esfera_de_governo: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderInstituicaoModal = () => {
    return (
      <CModal
        visible={InstituicaoModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setInstituicaoModalVisible(false)}>
          <CModalTitle>Detalhes do usuário</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentInstituicao.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome: <strong>{currentInstituicao.nome}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nome abreviado: <strong>{currentInstituicao.nome_abreviado}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CNPJ: <strong>{currentInstituicao.cnpj}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          CEP: <strong>{currentInstituicao.cep}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Logradouro: <strong>{currentInstituicao.logradouro}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Nº: <strong>{currentInstituicao.numero}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Complemento: <strong>{currentInstituicao.complemento}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Bairro: <strong>{currentInstituicao.bairro}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          UF: <strong>{currentInstituicao.uf}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Município: <strong>{currentInstituicao.municipio}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          E-mail: <strong>{currentInstituicao.email}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Esfera de governo: <strong>{currentInstituicao.esfera_de_governo}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteInstituicao(currentInstituicao.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setInstituicaoModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddInstituicaoModal = () => {
    return (
      <CModal
        visible={addInstituicaoModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddInstituicaoModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Instituição</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          {/* <InputLabel style={{ marginBottom: 10 }}>Código</InputLabel> */}
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({ ...newInstituicaoData, nome: e.target.value })
            }
            defaultValue={newInstituicaoData.nome}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({ ...newInstituicaoData, codigo: e.target.value })
            }
            defaultValue={newInstituicaoData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                nome_abreviado: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.nome_abreviado}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o nome abreviado"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                cnpj: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.cnpj}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o CNPJ"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                cep: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.cep}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o CEP"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                logradouro: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.logradouro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o logradouro"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                numero: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.numero}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o Número"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                complemento: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.complemento}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o complemento"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                bairro: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.bairro}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o Bairro"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                uf: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.uf}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o UF"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                municipio: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.municipio}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o município"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                email: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.email}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o e-mail"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewInstituicaoData({
                ...newInstituicaoData,
                esfera_de_governo: e.target.value,
              })
            }
            defaultValue={newInstituicaoData.esfera_de_governo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a esfera de governo"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newInstituicaoData.payment_method}
            onChange={(event) => {
              setNewInstituicaoData({
                ...newInstituicaoData,
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
            onClick={() => setAddInstituicaoModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addInstituicao(newInstituicaoData).then((res) =>
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

  const addInstituicao = async (Instituicao) => {
    const status = await InstituicoesService.add(Instituicao);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Instituição adicionado com sucesso!',
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

  const deleteInstituicao = async (Instituicao_id) => {
    const status = await InstituicoesService.remove(Instituicao_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Instituição excluído com sucesso!',
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
    setAddInstituicaoModalVisible(false);
    setNewInstituicaoData({
      codigo: '',
      nome: '',
      nome_abreviado: '',
      cnpj: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      uf: '',
      municipio: '',
      email: '',
      esfera_de_governo: '',
    });
    atualizarInstituicoes();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nome_abreviado', headerName: 'Nome Abreviado', width: 100 },
    { field: 'cnpj', headerName: 'CNPJ', width: 100 },
    { field: 'cep', headerName: 'CEP', width: 100 },
    { field: 'logradouro', headerName: 'Logradouro', width: 200 },
    { field: 'numero', headerName: 'Nº', width: 100 },
    { field: 'complemento', headerName: 'Complemento', width: 200 },
    { field: 'bairro', headerName: 'Bairro', width: 200 },
    { field: 'uf', headerName: 'UF', width: 100 },
    { field: 'municipio', headerName: 'Município', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'esfera_de_governo', headerName: 'Esfera de Governo', width: 200 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setInstituicaoModalVisible(false);
    setCurrentInstituicao({
      id: '',
      codigo: '',
      nome: '',
      nome_abreviado: '',
      cnpj: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      uf: '',
      municipio: '',
      email: '',
      esfera_de_governo: '',
    });
    atualizarInstituicoes();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentInstituicao(row);
    setInstituicaoModalVisible(true);
  };

  const atualizarInstituicoes = async () => {
    const InstituicoesAtualizados = await InstituicoesService.getAll();
    setInstituicoes(InstituicoesAtualizados);
  };

  React.useEffect(() => {
    atualizarInstituicoes();
  }, []);

  return (
    <>
      {InstituicaoModalVisible && renderInstituicaoModal()}
      {addInstituicaoModalVisible && renderAddInstituicaoModal()}
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
            onClick={() => setAddInstituicaoModalVisible(true)}
          >
            Adicionar Instituição <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Instituições</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={Instituicoes}
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

export default Instituicoes;
