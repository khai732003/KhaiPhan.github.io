
import './App.scss'
import Gioithieu from './content/Gioithieu/Gioithieu';
import Trangchu from './content/Trangchu/Trangchu';
import Dichvu from './content/dichvu/dichvu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './content/userprofile/profile';
import EditProfile from './content/userprofile/EditProfile';
import News from './content/tintuc/News';
// import DetailNewsPage from './content/tintuc/newsdetail';
import { listofnews } from './share/listOfnews';
// import ProductPage from './content/SanPham/ProductPage';
import Compare from './content/dichvu/compare/Compare';
import ProductPage from './content/SanPham/ProductPage'
import Detail from './content/SanPham/Detail'
import Success from './content/SanPham/Success'
import Login from './content/SanPham/Login';
import AddFeedBack from './content/SanPham/AddFeedBack';
import Register from './content/SanPham/Register'
import AddProductFormV4 from './content/SanPham/AddProductFormV4'
import Order from './content/SanPham/Order'
import { AuthProvider } from './content/SanPham/Context/AuthContext';
import { CartProvider } from './content/SanPham/Context/CartContext';
import Header from './header/Header';
import TintucStaff from './contentStaff/tintucStaff';

import UserManagement from './content/dashboard/pages/UserManagement';
import TimeLine from './content/dashboard/pages/TimeLine';
import ProductManagement from './content/dashboard/pages/ProductManagement';
import Home from './content/dashboard/pages/Home';
import Revenue from './content/dashboard/pages/Revenue';
import Footer from './footer/Footer';
import NewsDetail from './content/tintuc/NewsDetail'; 
import Product from './content/SanPham/Product';
import AdminProfile from './content/dashboard/pages/AdminProfile';
import AddEditProduct from './content/dashboard/components/AddEditProduct';

import AddEditUser from './content/dashboard/components/AddEditUser';
import PrivateRoute from './PrivateRoute';
import PaypalButton from './content/SanPham/PaypalButton';
import Voucher from './content/SanPham/Voucher';

import StaffManagement from './content/dashboard/pages/StaffManagement';
import AddEditStaff from './content/dashboard/components/AddEditStaff';
import ContactPage2 from './content/lienhe/ContactPage2';
import CustomProduct from './content/SanPham/CustomProduct';
import Error from './Error';
import ConfirmEmail from './content/SanPham/ConfirmEmail';
import VNPayPayment from './content/SanPham/VNPayPayment';
import HistoryOrder from './content/SanPham/HistoryOrder';
import AddAccessoriesForm from './content/dashboard/components/AddAccessoriesForm';
import LocalOrder from './content/SanPham/LocalOrder';
import AddEditCategory from './content/dashboard/components/AddEditCategory';
import ShowCustom from './content/SanPham/ShowCustom';
import ListNotConfirm from './content/dashboard/pages/ListNotConfirm';
import ConfirmPage from './content/dashboard/pages/ConfirmPage';
import ListDelivered from './content/dashboard/pages/ListDelivered';
import FeedBack from './content/dashboard/pages/FeedBack';
import VoucherList from './content/dashboard/pages/VoucherList';




function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Routes useScroll={scrollToTop}>

              {/* Vùng all role */}
              <Route exact path="/" element={<Trangchu />}> </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path='/contact' element={<ContactPage2 />} />
              <Route path="/Gioithieu" element={<Gioithieu />} />
              <Route path="/detail/:productId" element={<Detail />} />
              <Route path="/customdetail/:productId" element={<ShowCustom />} />
              <Route path="/sanpham" element={<ProductPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/news" element={<News />} />
              <Route path="/dichvu" element={<Compare />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile/:id" element={<EditProfile />} />
              <Route path="/paysuccess" element={<Success />} />
              <Route path="/paypal" element={<PaypalButton />} />
              <Route path="/localorder" element={<LocalOrder />} />
              <Route path="/pay/:orderId" element={<VNPayPayment />} />
              <Route path="/customeproduct/:id" element={<CustomProduct />} />
              <Route path="/email/:orderId" element={<ConfirmEmail />} />
              <Route element={<Error />} />
              <Route path="/addfeedback/:productId" element={<AddFeedBack />} />
              <Route path="/detail-news/:id" element={<NewsDetail/>} />

              {/* Vùng Admin */}
              <Route path="/addaccessories" element={<PrivateRoute allowedRoles={['ADMIN']} component={AddAccessoriesForm} path="/addaccessories" />} />
              <Route path="/add-edit-category" element={<PrivateRoute allowedRoles={['ADMIN']} component={AddEditCategory} path="/add-edit-category" />} />
              <Route path="/voucher" element={<PrivateRoute allowedRoles={['ADMIN']} component={Voucher} path="/voucher" />} />
              <Route path="/adminprofile" element={<PrivateRoute allowedRoles={['ADMIN']} component={AdminProfile} path="/adminprofile" />} />
              <Route path="/usermanagement" element={<PrivateRoute allowedRoles={['ADMIN']} component={UserManagement} path="/usermanagement" />} />
              <Route path="/productmanagement" element={<PrivateRoute allowedRoles={['ADMIN']} component={ProductManagement} path="/productmanagement" />} />
              <Route path="/revenue" element={<PrivateRoute allowedRoles={['ADMIN']} component={Revenue} path="/revenue" />} />
              <Route path="/timeline" element={<PrivateRoute allowedRoles={['ADMIN']} component={TimeLine} path="/TimeLine" />} />
              <Route path="/update-user/:id" element={<PrivateRoute allowedRoles={['ADMIN']} component={AddEditUser} path="/update-user/:id" />} />
              <Route path="/add-edit-user" element={<PrivateRoute allowedRoles={['ADMIN']} component={AddEditUser} path="/add-edit-user" />} />
              <Route path="/list-feedback" element={<PrivateRoute allowedRoles={['ADMIN']} component={FeedBack} path="/list-feedback" />} />
              <Route path="/list-voucher" element={<PrivateRoute allowedRoles={['ADMIN']} component={VoucherList} path="/list-voucher" />} />


              {/* Vùng manager */}
              <Route path="/staffmanagement" element={<PrivateRoute allowedRoles={['MANAGER']} component={StaffManagement} path="/staffmanagement" />} />
              <Route path="/add-edit-staff" element={<PrivateRoute allowedRoles={['MANAGER']} component={AddEditStaff} path="/add-edit-staff" />} />
              <Route path="/add-edit-user" element={<PrivateRoute allowedRoles={['MANAGER']} component={AddEditUser} path="/add-edit-user" />} />
              <Route path="/update-user/:id" element={<PrivateRoute allowedRoles={['MANAGER']} component={AddEditUser} path="/update-user/:id" />} />




              {/* Vùng Admin, Manager */}
              <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={UserManagement} path="/admin" />} />
              <Route path="/add-edit-product" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={AddEditProduct} path="/add-edit-product" />} />
              <Route path="/update-product/:id" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={AddEditProduct} path="/update-product/:id" />} />
              <Route path="/revenue" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={Revenue} path="/revenue" />} />
              <Route path="/addproduct" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={AddProductFormV4} path="/addproduct" />} />             
              <Route path="/listdelivered" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER']} component={ListDelivered} path="/listdelivered" />} />


              {/*Vùng Staff*/}

              {/* Vùng all trừ Customer */}
              <Route path="/staffnew" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER', 'STAFF']} component={TintucStaff} path="/staffnew" />} />
              <Route path="/listconfirm" element={<PrivateRoute allowedRoles={['ADMIN', 'MANAGER', 'STAFF']} component={ConfirmPage} path="/listconfirm" />} />

              {/* Vùng Customer */}
              <Route path="/order/:orderId" element={<PrivateRoute allowedRoles={['CUSTOMER']} component={Order} path="/order/:orderId" />} />
              <Route path="/history" element={<PrivateRoute allowedRoles={['CUSTOMER']} component={HistoryOrder} path="/history" />} />
              
              {/* <Route path="/history" element={<HistoryOrder />} /> */}
              <Route path='/error' element={<Error />} />

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
