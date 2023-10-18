
import './App.scss'
import Login from './components/loggin/loggin';
import SignUp from './components/loggin/signup';
import Gioithieu from './content/Gioithieu/Gioithieu';
import Trangchu from './content/Trangchu/Trangchu';
import Dichvu from './content/dichvu/dichvu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './content/userprofile/profile';
import NewsPage from './content/tintuc/tintuc';
import DetailNewsPage from './content/tintuc/newsdetail';
import { listofnews } from './share/listOfnews';
import ProductPage from './content/SanPham/ProductPage';
import Compare from './content/dichvu/compare/Compare';
import DetailProductPage from './content/SanPham/Detail';

function App() {
  return (
    <>
      <Router>
        <Routes useScroll={scrollToTop}>

          <Route exact path="/" element={<Trangchu />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Gioithieu" element={<Gioithieu />} />
          <Route path="/sanpham" element={<ProductPage/>} />
          <Route path="/tintuc" element={<NewsPage />} />
          <Route path="/dichvu" element={<Compare />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="tintuc/newsdetail/:id" element={<DetailNewsPage />} />
          <Route exact path="sanpham/productdetail/:id" element={<DetailProductPage/>} />
        </Routes>
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
