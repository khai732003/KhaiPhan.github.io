
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ProductPage from './SanPham/ProductPage';

// import { CartProvider } from "./SanPham/Context/CartContext";

// import AddProductForm from './SanPham/AddProductForm';
// import AddProductFormV2 from './SanPham/AddProductFormV2';
import ChatWidget from './SanPham/Chatgpt';


function App() {
  return (
    <div className="App">
    {/* <CartProvider>

    <ProductPage/>
   </CartProvider>
        <AddProductForm />  */}

       <h1>Your Product Page</h1>
      <p>Em nung lon qua.</p>
      <ChatWidget />
      

    </div>
  );
}


export default App;
