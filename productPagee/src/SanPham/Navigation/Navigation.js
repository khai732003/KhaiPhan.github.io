import React from 'react';
import { useCart } from '../Context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const { isCartOpen, toggleCart } = useCart();
    
    return (
      <div className="navigation">
        <Link to="/">HOME</Link>
        <button className="cart-button" onClick={toggleCart}>
          <ShoppingCartIcon />
        </button>
      </div>
    );
  };

export default Navigation;
