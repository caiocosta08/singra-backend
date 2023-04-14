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
import * as AditivosContratuaisService from '../../../services/aditivos_contratuais.service';
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
          {props.aditivo_contratual.client}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.status}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          {props.aditivo_contratual.description !== ''
            ? 'OBS: ' + props.aditivo_contratual.description
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
  aditivo_contratual: PropTypes.object,
  color: PropTypes.string,
  status: PropTypes.string,
  payment_status: PropTypes.string,
};

const AditivosContratuais = () => {
  const [aditivo_contratualModalVisible, setAditivoContratualModalVisible] = React.useState(false);
  const [addAditivoContratualModalVisible, setAddAditivoContratualModalVisible] =
    React.useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = React.useState(false);
  const [currentAditivoContratual, setCurrentAditivoContratual] = React.useState({});
  const [aditivos_contratuais, setAditivosContratuais] = React.useState([]);
  const [newAditivoContratualData, setNewAditivoContratualData] = React.useState({
    codigo: '',
    numero: '',
    codigo_contrato: '',
    motivo_adiamento: '',
    data_inicio_da_vigencia: '',
    data_termino_da_vigencia: '',
    objeto_do_aditivo: '',
    valor_do_aditivo: '',
    data_celebracao_do_aditivo: '',
    data_publicacao_do_aditivo: '',
    data_republicacao: '',
    url_do_aditivo_do_contrato: '',
  });
  const [alertBox, setAlertBox] = React.useState({
    visible: false,
    text: '',
    severity: 'success',
  });

  const renderAditivoContratualModal = () => {
    return (
      <CModal
        visible={aditivo_contratualModalVisible}
      >
        <CModalHeader closeButton={false} onClose={() => setAditivoContratualModalVisible(false)}>
          <CModalTitle>Detalhes do usuário</CModalTitle>
        </CModalHeader>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          ID: <strong>{currentAditivoContratual.id}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código: <strong>{currentAditivoContratual.codigo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Código do Contrato: <strong>{currentAditivoContratual.codigo_contrato}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Motivo do Adiamento: <strong>{currentAditivoContratual.motivo_adiamento}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data do início da vigência: <strong>{currentAditivoContratual.data_inicio_da_vigencia}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data do término da vigência: <strong>{currentAditivoContratual.data_termino_da_vigencia}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Objeto do aditivo: <strong>{currentAditivoContratual.objeto_do_aditivo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Valor do aditivo: <strong>{currentAditivoContratual.valor_do_aditivo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data da celebração do aditivo: <strong>{currentAditivoContratual.data_celebracao_do_aditivo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data da publicação do aditivo: <strong>{currentAditivoContratual.data_publicacao_do_aditivo}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          Data da republicação: <strong>{currentAditivoContratual.data_republicacao}</strong>
        </div>
        <div style={{ marginLeft: 10, marginTop: 10 }}>
          URL do aditivo do contrato: <strong>{currentAditivoContratual.url_do_aditivo_do_contrato}</strong>
        </div>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              deleteAditivoContratual(currentAditivoContratual.id).then((res) =>
                res ? deleteSuccess() : {},
              )
            }
          >
            Excluir
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setAditivoContratualModalVisible(false)}
          >
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    );
  };

  const renderAddAditivoContratualModal = () => {
    return (
      <CModal
        visible={addAditivoContratualModalVisible}
      >
        <CModalHeader
          closeButton={false}
          onClose={() => {
            setAddAditivoContratualModalVisible(false)
          }}
        >
          <CModalTitle>Adicionar Aditivo Contratual</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({ ...newAditivoContratualData, codigo: e.target.value })
            }
            defaultValue={newAditivoContratualData.codigo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                numero: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.numero}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o número"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                codigo_contrato: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.codigo_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o código do contrato"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                motivo_adiamento: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.motivo_adiamento}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o motivo do adiamento"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                data_inicio_da_vigencia: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.data_inicio_da_vigencia}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data do início da vigência"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                data_termino_da_vigencia: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.data_termino_da_vigencia}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data do término da vigência"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                objeto_do_aditivo: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.objeto_do_aditivo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o objeto do aditivo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                valor_do_aditivo: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.valor_do_aditivo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite o valor do aditivo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                data_celebracao_do_aditivo: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.data_celebracao_do_aditivo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da celebração do aditivo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                data_publicacao_do_aditivo: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.data_publicacao_do_aditivo}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da publicação do aditivo"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                data_republicacao: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.data_republicacao}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a data da republicação"
            variant="filled"
          />
          <TextField
            onChange={(e) =>
              setNewAditivoContratualData({
                ...newAditivoContratualData,
                url_do_aditivo_do_contrato: e.target.value,
              })
            }
            defaultValue={newAditivoContratualData.url_do_aditivo_do_contrato}
            style={{ marginTop: 5, marginBottom: 5 }}
            id="filled-basic"
            label="Digite a url do aditivo do contrato"
            variant="filled"
          />
          {/* <InputLabel style={{ marginBottom: 10 }}>
            Método de Pagamento
          </InputLabel>
          <Select
            value={newAditivoContratualData.payment_method}
            onChange={(event) => {
              setNewAditivoContratualData({
                ...newAditivoContratualData,
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
            onClick={() => setAddAditivoContratualModalVisible(false)}
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              addAditivoContratual(newAditivoContratualData).then((res) =>
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

  const addAditivoContratual = async (aditivo_contratual) => {
    const status = await AditivosContratuaisService.add(aditivo_contratual);
    if (status)
      setAlertBox({
        visible: true,
        text: 'Aditivo Contratual adicionado com sucesso!',
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

  const deleteAditivoContratual = async (aditivo_contratual_id) => {
    const status = await AditivosContratuaisService.remove(aditivo_contratual_id);
    if (status) {
      addSuccess()
      setAlertBox({
        visible: true,
        text: 'Aditivo Contratual excluído com sucesso!',
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
    setAddAditivoContratualModalVisible(false);
    setNewAditivoContratualData({
      codigo: '',
      numero: '',
      codigo_contrato: '',
      motivo_adiamento: '',
      data_inicio_da_vigencia: '',
      data_termino_da_vigencia: '',
      objeto_do_aditivo: '',
      valor_do_aditivo: '',
      data_celebracao_do_aditivo: '',
      data_publicacao_do_aditivo: '',
      data_republicacao: '',
      url_do_aditivo_do_contrato: '',
    });
    atualizarAditivosContratuais();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'codigo', headerName: 'Código', width: 200 },
    { field: 'numero', headerName: 'Nº', width: 200 },
    { field: 'codigo_contrato', headerName: 'Código do contrato', width: 200 },
    { field: 'motivo_adiamento', headerName: 'Motivo do adiamento', width: 200 },
    { field: 'data_inicio_da_vigencia', headerName: 'Data do início da vigência', width: 200 },
    { field: 'data_termino_da_vigencia', headerName: 'Data do término da vigência', width: 200 },
    { field: 'objeto_do_aditivo', headerName: 'Objeto do aditivo', width: 200 },
    { field: 'valor_do_aditivo', headerName: 'Valor do aditivo', width: 200 },
    { field: 'data_celebracao_do_aditivo', headerName: 'Data da celebração do aditivo', width: 200 },
    { field: 'data_publicacao_do_aditivo', headerName: 'Data da publicação do aditivo', width: 200 },
    { field: 'data_republicacao', headerName: 'Data da republicação', width: 200 },
    { field: 'url_do_aditivo_do_contrato', headerName: 'URL do aditivo do contrato', width: 200 },
    // valueGetter: (params) => `${params.row.id || ''}`,
  ];

  const deleteSuccess = async () => {
    setAditivoContratualModalVisible(false);
    setCurrentAditivoContratual({
      id: '',
      codigo: '',
      numero: '',
      codigo_contrato: '',
      motivo_adiamento: '',
      data_inicio_da_vigencia: '',
      data_termino_da_vigencia: '',
      objeto_do_aditivo: '',
      valor_do_aditivo: '',
      data_celebracao_do_aditivo: '',
      data_publicacao_do_aditivo: '',
      data_republicacao: '',
      url_do_aditivo_do_contrato: '',
    });
    atualizarAditivosContratuais();
  };

  const handleOnClickRow = ({ row }) => {
    setCurrentAditivoContratual(row);
    setAditivoContratualModalVisible(true);
  };

  const atualizarAditivosContratuais = async () => {
    const aditivos_contratuaisAtualizados = await AditivosContratuaisService.getAll();
    setAditivosContratuais(aditivos_contratuaisAtualizados);
  };

  React.useEffect(() => {
    atualizarAditivosContratuais();
  }, []);

  return (
    <>
      {aditivo_contratualModalVisible && renderAditivoContratualModal()}
      {addAditivoContratualModalVisible && renderAddAditivoContratualModal()}
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
            onClick={() => setAddAditivoContratualModalVisible(true)}
          >
            Adicionar Aditivo Contratual <Add style={{ color: '#fff' }} />
          </CButton>
        </div>
        <CCardHeader>Aditivos Contratuais</CCardHeader>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={aditivos_contratuais}
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

export default AditivosContratuais;
