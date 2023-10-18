import React from 'react';
import { ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './Context/CartContext';
const CartItem = ({ item }) => {

  const { removeFromCart } = useCart();
  const handleDelete = () => {
    removeFromCart();
  };

  return (
    <ListItem>
      <div className="custom-avatar">
        <img src={item.productImage} alt={item.name} />
      </div>
      <ListItemText
        primary={`${item.name} (CODE: ${item.code})`}
        secondary={`Price: ${item.totalPrice}`}
      />
      <IconButton aria-label="delete" onClick={handleDelete}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
