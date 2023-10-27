
import './App.scss'
import Gioithieu from './content/Gioithieu/Gioithieu';
import Trangchu from './content/Trangchu/Trangchu';
import Dichvu from './content/dichvu/dichvu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './content/userprofile/profile';
import NewsPage from './content/tintuc/tintuc';
// import DetailNewsPage from './content/tintuc/newsdetail';
import { listofnews } from './share/listOfnews';
// import ProductPage from './content/SanPham/ProductPage';
import Compare from './content/dichvu/compare/Compare';
import ProductPage from './content/SanPham/ProductPage'
import Detail from './content/SanPham/Detail'
import Success from './content/SanPham/Success'
import Login from './content/SanPham/Login'
import Register from './content/SanPham/Register'
import Order from './content/SanPham/Order'
import { AuthProvider } from './content/SanPham/Context/AuthContext';
import { CartProvider } from './content/SanPham/Context/CartContext';
import Header from './header/Header';
import TintucStaff from './contentStaff/tintucStaff';

import FormAddEdit from './content/dashboard/components/FormAddEdit';
import UserManagement from './content/dashboard/pages/UserManagement';
import ProductManagement from './content/dashboard/pages/ProductManagement';
import Home from './content/dashboard/pages/Home';
import Revenue from './content/dashboard/pages/Revenue';
import Footer from './footer/Footer';

import DetailNewsPage from './content/tintuc/newsdetail';
import Product from './content/SanPham/Product';


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Routes useScroll={scrollToTop}>

              <Route exact path="/" element={<Trangchu />}> </Route>
              

              <Route path="/admin" element={<Home />} />
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route path="/productmanagement" element={<ProductManagement />} />
              <Route path="/add" element={<FormAddEdit />} />
              <Route path="/update/:id" element={<FormAddEdit />} />
              <Route path="/revenue" element={<Revenue />} />


              <Route path="/Gioithieu" element={<Gioithieu />} />
              <Route path="/paysuccess" element={<Success />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detail/:productId" element={<Detail />} />
              <Route path="/sanpham" element={<ProductPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route path="/tintuc" element={<NewsPage />} />
              <Route path="/dichvu" element={<Compare />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/staffnew" element={<TintucStaff/>} />
              <Route exact path="tintuc/newsdetail/:id" element={<DetailNewsPage/>} />

            </Routes>
            <Footer/>
          </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
export default App;
