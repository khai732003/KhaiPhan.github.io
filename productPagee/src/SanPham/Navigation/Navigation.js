import React from 'react';
import { useCart } from '../Context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navigation = () => {
    const { isCartOpen, toggleCart } = useCart();
    
    return (
      <div className="navigation">
        <button className="cart-button" onClick={toggleCart}>
          <ShoppingCartIcon />
        </button>
      </div>
    );
  };

export default Navigation;
