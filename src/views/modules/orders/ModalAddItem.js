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
import {
  Alert,
  TextField,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import * as ProductsService from '../../../services/products.service';
import { formatMoney } from '../../../services/utils.service';

const ModalAddItem = (props) => {
  const [items, setItems] = React.useState([
    // { id: 1, title: 'Santa Teresinha com coca', price: 3000 },
    // { id: 2, title: 'Santa Teresinha com guaraná', price: 3000 },
    // { id: 3, title: 'Santa Teresinha com suco', price: 3000 },
    // { id: 4, title: 'Santa Francisco com coca', price: 1500 },
    // { id: 5, title: 'Santa Francisco com guaraná', price: 1500 },
    // { id: 6, title: 'Santa Francisco com suco', price: 1500 },
    // { id: 7, title: 'Santa Josemaria com coca', price: 2500 },
    // { id: 8, title: 'Santa Josemaria com guaraná', price: 2500 },
    // { id: 9, title: 'Santa Josemaria com suco', price: 2500 },
    // { id: 10, title: 'Açaí', price: 3000 },
  ]);

  const [selectedItem, setSelectedItem] = React.useState({});

  const getProducts = async () => {
    const products = await ProductsService.getProducts();
    if (products) setItems(products);
    else setItems([]);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {props.visible && (
        <CModal visible={props.visible} onClose={props.onClose}>
          <CModalHeader onClose={props.onClose}>
            <CModalTitle>Adicionar Item</CModalTitle>
          </CModalHeader>
          <CModalBody style={{ flexDirection: 'column', display: 'flex' }}>
            <Select
              value={selectedItem}
              onChange={(event) => {
                setSelectedItem(event.target.value);
              }}
            >
              {items.map((i) => {
                return (
                  <MenuItem key={i.id} value={i}>
                    {i.title} {'(' + i.quantity + ')'}{' '}
                    {' - ' + formatMoney(i.price) + ''}
                  </MenuItem>
                );
              })}
            </Select>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={props.onClose}>
              Fechar
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                props.onAdd(selectedItem);
                props.onClose();
              }}
            >
              Confirmar
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
};
ModalAddItem.propTypes = {
  visible: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
};

export default ModalAddItem;
