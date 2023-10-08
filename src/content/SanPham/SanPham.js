import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import Navigation from "./Navigation/Nav"
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Slidebar from "./Slidebar/Slidebar";

function SanPham() {
  return (
    <>
      <Header />
      <Slidebar />
      <Navigation />
      <Recommended />
      <Products />
      <Footer />

    </>

  );
}

export default SanPham;
