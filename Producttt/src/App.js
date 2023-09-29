import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Router' from 'react-router-dom'
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import DefaultPage from './components/DefaultPage';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';

function App() {
  return (
//     <Router>
//       <Routes>
//   <Route path="/login" element={<Login />} />
//   <Route path="/register" element={<Register />} />
//   <Route path="/*" element={<DefaultPage />} />
// </Routes>
//     </Router>

      // <ProductList/>
      <ProductPage/>
      // <Register/>
  );
}

export default App;
