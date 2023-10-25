
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ProductPage from './SanPham/ProductPage';

// import { CartProvider } from "./SanPham/Context/CartContext";

// import AddProductForm from './SanPham/AddProductForm';
// import AddProductFormV2 from './SanPham/AddProductFormV2';
import AddProductFormV3 from './SanPham/AddProductFormV3';


function App() {
  return (
    <div className="App">
    {/* <CartProvider>

    <ProductPage/>
   </CartProvider>
        <AddProductForm />  */}
        <AddProductFormV3 /> 
       

    </div>
  );
}


export default App;
