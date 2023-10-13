
import './App.scss';
import Login from './components/loggin/loggin';
import SignUp from './components/loggin/signup';
import Gioithieu from './content/Gioithieu/Gioithieu';
import Trangchu from './content/Trangchu/Trangchu';
import Tintuc from './content/tintuc/tintuc';
import Dichvu from './content/dichvu/dichvu';
import SanPham from './content/SanPham/SanPham';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './content/userprofile/profile';
import NewsPage from './content/tintuc/tintuc';
import DetailNewsPage from './content/tintuc/newsdetail';
import { listofnews } from './share/listOfnews';

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route exact path="/" element={<Trangchu />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Gioithieu" element={<Gioithieu />} />
          <Route path="/sanpham" element={<SanPham />} />
          <Route path="/tintuc" element={<NewsPage />} />
          <Route path="/dichvu" element={<Dichvu />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="tintuc/newsdetail/:id" element={<DetailNewsPage />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
