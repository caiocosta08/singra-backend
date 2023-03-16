import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import io from 'socket.io-client';
import { CCard } from '@coreui/react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
const socket = io('https://goldfish-app-4t6d6.ondigitalocean.app/');

const Whatsapp = () => {
  axios.defaults.baseURL = 'http://192.168.1.113:8082';

  const [newMessage, setNewMessage] = React.useState('');

  const getQrCodes = async () => {
    const response = await axios.get('/get_qr_codes');
    console.log(response.data);
  };

  const sendNewMessage = async () => {
    const response = await axios.post('message_to_groups', {
      message: newMessage,
    });
  };

  React.useEffect(() => {
    getQrCodes();
  }, []);

  return (
    <>
      <CCard
        className="mb-4"
        style={{
          overflowX: 'hidden',
          overflow: 'auto',
          height: '100vh',
          width: '100%',
          paddingBottom: 50,
        }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          id="filled-basic"
          label="Filled"
          variant="filled"
        />
        <Button onClick={sendNewMessage} variant="contained">
          ENVIAR MENSAGEM
        </Button>
      </CCard>
    </>
  );
};

export default Whatsapp;
