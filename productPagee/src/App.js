import Detail from "./SanPham/Detail";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './SanPham/ProductPage';
import ContactPage from './components/ContactPage'

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <ContactPage /> */}
      <ProductPage/>
    </div>

    // <div>
    //   <Routes>
    //     <Route path='/' element={<ProductPage/>}></Route>
    //     <Route path='/detail/:id' element={<Detail />}></Route>
    //   </Routes>
    // </div>
  );
}

export default App;
