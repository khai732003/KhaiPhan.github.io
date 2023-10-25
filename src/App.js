
import './App.scss'
import Login from './components/loggin/loggin';
import SignUp from './components/loggin/signup';
import Gioithieu from './content/Gioithieu/Gioithieu';
import Trangchu from './content/Trangchu/Trangchu';
import Dichvu from './content/dichvu/dichvu';
import Profile from './content/userprofile/profile';
import NewsPage from './content/tintuc/tintuc';
import DetailNewsPage from './content/tintuc/newsdetail';
import { listofnews } from './share/listOfnews';
import ProductPage from './content/SanPham/ProductPage';
import Compare from './content/dichvu/compare/Compare';
import DetailProductPage from './content/SanPham/Detail';



// function App() {
//   return (
//     <>
//       <Router>
//         <Routes useScroll={scrollToTop}>

//           <Route exact path="/" element={<Trangchu />}></Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/Gioithieu" element={<Gioithieu />} />
//           <Route path="/sanpham" element={<ProductPage/>} />
//           <Route path="/tintuc" element={<NewsPage />} />
//           <Route path="/dichvu" element={<Compare />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route exact path="tintuc/newsdetail/:id" element={<DetailNewsPage />} />
//           <Route exact path="sanpham/productdetail/:id" element={<DetailProductPage/>} />
//           <Route exact path="gioithieu/productdetail/:id" element={<DetailProductPage/>} />
//         </Routes>
//       </Router>

//     </>
//   );
// }
// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// }
// export default App;

// import Dashboard from "./services/dashboard";
// import Logintest from "./services/login";
// import Register from "./services/register";
// import Reset from "./services/reset";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import TrangchuUser from './content/Trangchu/TrangchuUser';

import Header from './header/Header';
import TintucStaff from './contentStaff/tintucStaff';
import NewsDetailUpdate from './contentStaff/updatetintuc';


function App() {
  return (
    <>
      <div className="app">

        
            <Router>
              <Header />
              <Routes>
                <Route exact path="/" element={<Trangchu />}></Route>
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/staffnew" element={<TintucStaff/>} />
                <Route path="/trangchuuser" element={<TrangchuUser />} />
                <Route path="/Gioithieu" element={<Gioithieu />} />
                <Route path="/sanpham" element={<ProductPage />} />
                <Route path="/tintuc" element={<NewsPage />} />
                <Route path="/dichvu" element={<Compare />} />
                <Route path="/profile" element={<Profile />} />
                <Route exact path="tintuc/newsdetail/:id" element={<DetailNewsPage />} />
                <Route exact path="staffnew/newsdetailUpdate/:id" element={<NewsDetailUpdate/>} />
                <Route exact path="sanpham/productdetail/:id" element={<DetailProductPage />} />
                <Route exact path="gioithieu/productdetail/:id" element={<DetailProductPage />} />
          
              </Routes>
            </Router>
  
      </div>
    </>
  );
}

export default App;

