import React from 'react';
import { ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import { useCart } from './Context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';

import "../SanPham/Scss/cart.scss"

const CartItem = ({ item }) => {

  const { removeFromCart } = useCart();
  const handleDelete = () => {
    removeFromCart();
  };
  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  return (
    <ListItem style={{height : '100%'}} disablePadding={true} subheader className='container-cart'>
      <Avatar className='img-cart' style={{height: '6rem', width : '6rem'}}  variant="square" src={item.productImage} alt={item.name} />
      <ListItemText 
        primary={`${item.name} (CODE: ${item.code})`}
        secondary={`Price: ${formatCurrency(item.totalPrice)}`}
      />
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  );
};

export default CartItem;
