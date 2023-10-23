import React from 'react';
import { ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './Context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';

import "../SanPham/Scss/cart.scss"

const CartItem = ({ item }) => {

  const { removeFromCart } = useCart();
  const handleDelete = () => {
    removeFromCart();
  };

  return (
    <ListItem>
      <Avatar src={item.productImage} alt={item.name} />
      <ListItemText
        primary={`${item.name} (CODE: ${item.code})`}
        secondary={`Price: ${item.totalPrice}`}
      />
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
